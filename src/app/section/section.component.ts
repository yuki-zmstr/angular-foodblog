import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  
})
export class SectionComponent implements OnInit {

  @Input() section!:string

  foods?: Food[];

  getFoods() {
    // console.log("in get food function")
    // console.log("searching for: ", this.section)
    this.authService.GetFoods(this.section).then((foods) => this.foods = foods)
  }

  removeSpaces(name: any) {
    return name.replace(/ /g, "")
  }

  constructor(public authService: AuthenticationService ) { }

  ngOnInit(): void {
    this.getFoods()
    // console.log(this.foods)
    // this.foods= [{
    //   category: "breakfast",
    //   img_url: "...",
    //   comments: [],
    //   name: "chicken sandwich"
    // }]
    
  }

}
