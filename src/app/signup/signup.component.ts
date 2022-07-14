import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from '../services/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    console.log(password)
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(confirmPassword)
    if (password && confirmPassword && password != confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

export function passwordsLengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    console.log(password)
    if (password.length <= 5) {
      return {
        passwordsTooShort: true
      }
    }
    return null;
  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')},{ validators: [passwordsMatchValidator(),passwordsLengthValidator()] 
    })

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  // get email() {
  //   return this.signUpForm.get('name') + "@yumzandsweetz.com";
  // }
  // get password() {
  //   return String(this.signUpForm.get('password'))
  // }

  signUp(name: any, password: any){
    const email = name + "@yumzandsweetz.com"
    const userData: UserProfile = {
      email: email,
      password: password,
    }
    console.log(userData)
    this.authService.SignUp(userData)
  }

}
