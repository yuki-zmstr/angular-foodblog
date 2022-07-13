import { Component, OnInit } from '@angular/core';
import { Sections } from '../sections';
// import $ from "jquery";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  sections = Sections

  constructor() { }

  ngOnInit(): void {
    // top nav fixed position
    
  }

}
