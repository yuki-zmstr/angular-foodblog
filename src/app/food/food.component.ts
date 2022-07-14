import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  @Input() food!:Food

  comment = new FormControl('', Validators.required)


  addComment(foodName: any, comment: any) {
    console.log("adding comment: ", comment, "for", foodName)
    this.authService.addComment(foodName, comment)
  }

  submit(foodName: any, comment: any) {
    console.log("form submitted", comment, "for", foodName)
  }

  removeSpaces(name: any) {
    return name.replace(/ /g, "")
  }


  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
