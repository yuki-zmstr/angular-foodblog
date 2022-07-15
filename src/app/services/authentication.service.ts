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
  providedIn: 'root'
})
export class AuthenticationService {
  userData?: UserProfile; // saved logged in user data

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(
    public afs: AngularFirestore, // inject Firestore service
    public afAuth: AngularFireAuth, // inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
    private http: HttpClient,
  ) {
    // save user data in localstorage when logged in and setting up null when logged out.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.GetUserData(user.email!).then(()=>{
          localStorage.setItem('user', JSON.stringify(this.userData));
        }); 
      } else {
        localStorage.setItem('user', 'null');
      }
    })
   }

   openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 5000,
    });
  }


  
  // log in with email and password. append @yumzandsweetz.com to username from UI.
  LogIn (userProfile: UserProfile) {
    return this.afAuth
    .signInWithEmailAndPassword(userProfile.email!, userProfile.password!)
    .then((result) => {
      // this.openSnackBar("Logged in successfully!")
      this.router.navigate(['/home']);
      // window.alert("Logged in successfully!")

  }).catch((error) => {
    window.alert(error.message);
  })}
  

  // Sign up with email/password
  SignUp(userProfile: UserProfile){
    return this.afAuth
    .createUserWithEmailAndPassword(userProfile.email!, userProfile.password!)
    .then((result) => {
      this.SetUserData(userProfile).then(()=>{
        this.router.navigate(['/home'])
        // this.openSnackBar("Signed up successfully!")
        // window.alert("Signed up successfully!")
      }).catch((error) => {
        window.alert(error.message)
      })
    })
  }

  // Returns true when user is logged in.
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  get isAdmin(): boolean {
    if (this.userData == null) {
      return false;
    }
    return this.userData.is_admin!;
  }

  SetUserData(user: UserProfile) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.email}`)
    return userRef.set(user, {merge: true})
    .then(()=>{
      this.userData = user; 
      localStorage.setItem('user', JSON.stringify(this.userData))
    })
  }

  LogOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = undefined;
      window.location.reload();
      this.router.navigate(['/home']);
      //refresh when sign out
  
      window.alert("logged out successfully!")
    });
  }

  GetUserData(email: string) {
    // const user_mail = JSON.parse(localStorage.getItem('user')!).email;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${email}`
    );
    return userRef.
    ref
    .get()
    .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const userData = this.parseUser(data);
          this.userData = userData;
        } else {
            window.alert("Error while loading user data!")
        }
      })}

  parseUser(data: any): UserProfile {
    return {
      email: data.email,
      password: data.password,
      // comments: (data.comments == null) ? [] : data.comments,
      is_admin: (data.is_admin == null) ? false : data.is_admin,
    }
  }

  async GetFoods(category: string) {
    // take in category as parameter -> search for foods with this category
    const foods: Food[] = [];
    const foodCollection: AngularFirestoreCollection<Food> = this.afs.collection(`foods/`);
  await foodCollection.ref.get()
  .then((querySnapShot) => {
    querySnapShot.forEach(async(food_detail) => {
      let food: Food = food_detail.data();
      if (food.category == category) {
        foods.push(food)
      }
      })
    }).catch((error)=>{
      window.alert(error.message);
    })
    return foods
  }

  async addComment(foodName: any, comment: any) {
    if (! this.isLoggedIn) {
      window.alert("Please log in to leave a comment.\nコメントをするにはログインして下さい。")
    } else if (comment == ''){
      window.alert("Comment box is empty.\nコメントを入力して下さい。")
    }
    else {
        // first read the current comments
        const foodDocument: AngularFirestoreDocument<Food> = this.afs.doc(`foods/${foodName}`)
        const currentComments: any = (await foodDocument.ref.get()).data()?.comments
        currentComments.push(comment)
        foodDocument.update({comments: currentComments})
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
        
    }
    return true
    
  }
  getComments(foodName: string) {
    const foodRef: AngularFirestoreDocument<any> = this.afs.doc(
      `foods/${foodName}`
    )
    var comments: Comment[] = [];

    foodRef.ref.get().then(doc => {
      if (!doc.exists) {
        throw new Error("The food doesn't exist")
      }
    })

    const commentCollection = foodRef.collection('comments');
    return commentCollection.ref.get().then((collection) => {
      collection.forEach(comment => {
        // comments.push(comment.data())
      })
    }).then (() => {return comments})
  }

  addFood(food: Food) {
    var foodRef: AngularFirestoreDocument<any> = this.afs.doc(
      `foods/${food.name}`
    );
    return foodRef.ref.get().then(doc=> {
      if (doc.exists) {
        throw new Error("The food data exists already!");
      } else {
        return foodRef.set(food, {
          merge: true,
        }).then(()=> {
          window.location.reload()
          // this.router.navigate(['/admin']);
          return true;
        })
      }
    })

  }

}