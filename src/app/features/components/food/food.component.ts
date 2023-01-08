import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  @Input() food!: Food;

  comment = new FormControl('', Validators.required);

  addComment(foodName: string | undefined, comment: string) {
    this.authService.addComment(foodName, comment);
  }

  removeSpaces(name: string | undefined) {
    return name?.replace(/ /g, '');
  }

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}
}
