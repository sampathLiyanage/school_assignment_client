import {Component, OnInit} from '@angular/core';
import {School} from '../app.school';
import {ApiService} from '../api.service';
import {ConfigService} from '../config.service';
import {ValidationMessagesService} from '../validation-messages.service';

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.component.html',
  styleUrls: ['./school-page.component.css']
})
export class SchoolPageComponent implements OnInit {

  schools: School[];
  displayedColumns: string[] = ['name', 'address', 'noOfStudents'];
  hasLoadMore: boolean;
  pageOffset: number;
  latestFilter: string;
  addFormShown: boolean;
  validationMessagesService = ValidationMessagesService;

  constructor(
    private apiService: ApiService) {
    this.schools = [];
    this.hasLoadMore = false;
    this.pageOffset = 0;
    this.latestFilter = '';
    this.addFormShown = false;
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

  loadMore(): void {
    this.pageOffset = this.schools.length;
    this.getSchools(this.latestFilter, true);
  }

  hideAddFormAndRefreshResults(): void {
    this.addFormShown = false;
    if (this.pageOffset === 0) {
      this.getSchools(this.latestFilter, false);
    }
  }

  hideAddForm(): void {
    this.addFormShown = false;
  }

  getValidationMessageService(): ValidationMessagesService{
    return ValidationMessagesService;
  }

  ngOnInit(): void {
    this.getSchools();
  }

}
