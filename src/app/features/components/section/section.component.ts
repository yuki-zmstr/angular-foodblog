import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section!: string;

  foods?: Food[];

  getFoods() {
    this.authService.GetFoods(this.section).then(foods => (this.foods = foods));
  }

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getFoods();
  }
}
