import { Injectable, NgZone } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData?: UserProfile; // saved logged in user data

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(
    public afs: AngularFirestore, // inject Firestore service
    public afAuth: AngularFireAuth, // inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    // save user data in localstorage when logged in and setting up null when logged out.
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.GetUserData(user.email).then(() => {
          localStorage.setItem(
            'user',
            JSON.stringify({ email: user.email, is_admin: false })
          );
        });
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  // log in with email and password. append @yumzandsweetz.com to username from UI.
  LogIn(userProfile: UserProfile) {
    return this.afAuth
      .signInWithEmailAndPassword(userProfile.email, userProfile.password)
      .then(() => {
        this.router.navigate(['/home']);
        window.alert('Logged in successfully!');
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  async SignUp(userProfile: UserProfile) {
    await this.afAuth.createUserWithEmailAndPassword(
      userProfile.email,
      userProfile.password
    );
    this.router.navigate(['/home']).then(() => {
      window.alert('Signed up successfully!');
    });
    this.SetUserData({ email: userProfile.email, is_admin: false });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user !== null ? true : false;
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user !== null ? user.is_admin : false;
  }

  async SetUserData(user: { email: string; is_admin: boolean }) {
    localStorage.setItem('user', JSON.stringify(user));

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.email}`
    );
    await userRef.set(user, { merge: true });
    localStorage.setItem('user', JSON.stringify(user));
  }

  async LogOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    window.alert('logged out successfully!');
  }

  async GetUserData(email: string | null) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${email}`
    );
    const doc = await userRef.ref.get();
    if (!doc.exists) {
      window.alert('Error while loading user data!');
    }
  }

  parseUser(data: UserProfile): { email: string; is_admin: boolean } {
    return {
      email: data.email,
      is_admin: data.is_admin == null ? false : data.is_admin,
    };
  }

  async GetFoods(category: string) {
    // take in category as parameter -> search for foods with this category
    const foods: Food[] = [];
    const foodCollection: AngularFirestoreCollection<Food> =
      this.afs.collection(`foods/`);
    await foodCollection.ref
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(async food_detail => {
          const food: Food = food_detail.data();
          if (food.category == category) {
            foods.push(food);
          }
        });
      })
      .catch(error => {
        window.alert(error.message);
      });
    return foods;
  }

  async addComment(foodName: string | undefined, comment: string) {
    if (!this.isLoggedIn) {
      window.alert(
        'Please log in to leave a comment.\nコメントをするにはログインして下さい。'
      );
    } else if (comment == '') {
      window.alert('Comment box is empty.\nコメントを入力して下さい。');
    } else {
      // first read the current comments
      const foodDocument: AngularFirestoreDocument<Food> = this.afs.doc(
        `foods/${foodName}`
      );
      const currentComments: string[] | undefined = (
        await foodDocument.ref.get()
      )?.data()?.comments;
      currentComments?.push(comment);
      foodDocument.update({ comments: currentComments });
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
    return true;
  }
  getComments(foodName: string) {
    const foodRef: AngularFirestoreDocument<any> = this.afs.doc(
      `foods/${foodName}`
    );
    const comments: Comment[] = [];

    foodRef.ref.get().then(doc => {
      if (!doc.exists) {
        throw new Error("The food doesn't exist");
      }
    });

    const commentCollection = foodRef.collection('comments');
    return (
      commentCollection.ref
        .get()
        // .then(collection => {
        //   collection.forEach(comment => {
        //     // comments.push(comment.data())
        //   });
        // })
        .then(() => {
          return comments;
        })
    );
  }

  async addFood(food: Food) {
    const foodRef: AngularFirestoreDocument<any> = this.afs.doc(
      `foods/${food.name}`
    );
    const doc = await foodRef.ref.get();
    if (doc.exists) {
      throw new Error('The food data exists already!');
    } else {
      return foodRef
        .set(food, {
          merge: true,
        })
        .then(() => {
          window.location.reload();
          return true;
        });
    }
  }
}
