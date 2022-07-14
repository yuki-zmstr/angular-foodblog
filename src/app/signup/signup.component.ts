import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')})

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
