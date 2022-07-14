import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  @Input() food!:Food

  
  addComment(foodName: string, comment: string) {
    this.authService.addComment(this.food.name, comment).then((comments) => this.food.comments = comments)
  }

  removeSpaces(name: any) {
    return name.replace(/ /g, "")
  }
  

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
