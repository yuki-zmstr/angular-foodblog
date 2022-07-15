import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    login_name: new FormControl(''),
    login_password: new FormControl('')
  })


  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logIn(name:any, password: any) {
    console.log(name)
    console.log(password)
    const email = name + "@yumzandsweetz.com"
    const userData: UserProfile = {
      email: email,
      password: password,
    }
    console.log(userData)
    this.authService.LogIn(userData)
  }

}
