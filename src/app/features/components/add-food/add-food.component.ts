import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Food } from '../../models/food';


@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {
  addFoodForm = new FormGroup({

    Name: new FormControl(''),
    Category: new FormControl('',),
    Subcategory: new FormControl(''),
    Desc_en: new FormControl(''),
    Desc_jp: new FormControl(''),
    Img_url: new FormControl(''),
    },)
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  addFood(name:any, category:any, subcategory:any, img_url: any, desc_en: any, desc_jp:any) {
    const foodProfile: Food = {
        name:name,
        category:category,
        subcategory:subcategory,
        img_url:img_url,
        desc_en: desc_en,
        desc_jp: desc_jp,
        comments: []
    }
    // console.log("adding food", foodProfile)
    this.authService.addFood(foodProfile)

  }
}
