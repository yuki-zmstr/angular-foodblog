import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Food } from '../../models/food';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
})
export class AddFoodComponent implements OnInit {
  addFoodForm = new FormGroup({
    Name: new FormControl(''),
    Category: new FormControl(''),
    Subcategory: new FormControl(''),
    Desc_en: new FormControl(''),
    Desc_jp: new FormControl(''),
    Img_url: new FormControl(''),
  });
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}

  addFood(
    name: string,
    category: string,
    subcategory: string,
    img_url: string,
    desc_en: string,
    desc_jp: string
  ) {
    const foodProfile: Food = {
      name: name,
      category: category,
      subcategory: subcategory,
      img_url: img_url,
      desc_en: desc_en,
      desc_jp: desc_jp,
      comments: [],
    };
    this.authService.addFood(foodProfile);
  }
}
