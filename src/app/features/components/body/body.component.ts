import { Component, OnInit } from '@angular/core';
import { Sections } from '../../../sections';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  sections = Sections;

  constructor() {}

  ngOnInit(): void {}
}
