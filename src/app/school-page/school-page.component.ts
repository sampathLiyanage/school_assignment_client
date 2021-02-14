import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.component.html',
  styleUrls: ['./school-page.component.css']
})
export class SchoolPageComponent implements OnInit {

  addFormShown: boolean;

  constructor() {
    this.addFormShown = false;
  }

  ngOnInit(): void {
  }

}
