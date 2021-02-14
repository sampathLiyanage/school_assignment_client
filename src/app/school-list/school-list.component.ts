import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {School} from '../app.school';
import {ApiService} from '../api.service';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  schools: School[];
  displayedColumns: string[] = ['name', 'address', 'noOfStudents'];
  hasLoadMore: boolean;
  pageOffset: number;
  latestFilter: string;
  addButtonShown: boolean;

  @Output() addButtonClick = new EventEmitter<string>();

  constructor(
    private apiService: ApiService) {
    this.schools = [];
    this.hasLoadMore = false;
    this.pageOffset = 0;
    this.latestFilter = '';
    this.addButtonShown = true;
  }

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

  refreshIfFirstPage(): void {
    if (this.pageOffset === 0) {
      this.getSchools(this.latestFilter, false);
    }
  }

  loadMore(): void {
    this.pageOffset = this.schools.length;
    this.getSchools(this.latestFilter, true);
  }

  ngOnInit(): void {
    this.getSchools();
  }

}
