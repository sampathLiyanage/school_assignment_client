import {Component, OnInit} from '@angular/core';
import {School} from '../app.school';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  schools: School[];
  displayedColumns: string[] = ['name', 'address', 'noOfStudents'];

  constructor(private apiService: ApiService) {
    this.schools = [];
  }

  getSchools(event?: Event): void {
    if (event) {
      this.apiService.getSchools((event.target as HTMLInputElement).value)
        .subscribe(schools => {
          console.log(schools);
          this.schools = schools;
        });
    } else {
      this.apiService.getSchools()
        .subscribe(schools => {
          console.log(schools);
          this.schools = schools;
        });
    }
  }

  ngOnInit(): void {
    this.getSchools();
  }

}
