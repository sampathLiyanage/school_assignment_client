import {Component, OnInit} from '@angular/core';
import {School} from '../app.school';
import {ApiService} from '../api.service';
import {ConfigService} from '../config.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  schools: School[];
  displayedColumns: string[] = ['name', 'address', 'noOfStudents'];
  hasLoadMore: boolean;
  pageOffset: number;
  latestFilter: string;
  addFormShown: boolean;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.schools = [];
    this.hasLoadMore = false;
    this.pageOffset = 0;
    this.latestFilter = '';
    this.addFormShown = false;
  }

  addSchoolForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]),
    noOfStudents: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ])
  });

  getSchools(searchString?: string, append: boolean = false): void {
    let filterString: string = 'limit=' + ConfigService.NO_RECORDS_PER_PAGE + '&offset=' + this.pageOffset;
    filterString += searchString ? ('&search=' + searchString) : '';
    this.apiService.getSchools(filterString)
      .subscribe(schools => {
        if (!append) {
          this.schools = schools;
        } else {
          this.schools = this.schools.concat(schools);
        }
        this.hasLoadMore = (schools.length === ConfigService.NO_RECORDS_PER_PAGE);
      });
  }

  filterSchools(event: Event): void {
    this.pageOffset = 0;
    this.latestFilter = (event.target as HTMLInputElement).value;
    this.getSchools(this.latestFilter);
  }

  loadMore(): void {
    this.pageOffset = this.schools.length;
    this.getSchools(this.latestFilter, true);
  }

  addSchool(): void {
    console.log(this.addSchoolForm.value);
    this.apiService.addSchool(this.addSchoolForm.value as School)
      .subscribe(school => {
        console.log(school);
      });
  }

  ngOnInit(): void {
    this.getSchools();
  }

}
