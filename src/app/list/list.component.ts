import {Component, OnInit} from '@angular/core';
import {School} from '../app.school';
import {ApiService} from '../api.service';
import {ConfigService} from '../config.service';
import {FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ValidationMessagesService} from '../validation-messages.service';

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
  validationMessagesService = ValidationMessagesService;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.schools = [];
    this.hasLoadMore = false;
    this.pageOffset = 0;
    this.latestFilter = '';
    this.addFormShown = false;
  }

  addSchoolForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
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

  addSchool(form: any): void {
    if (form.valid) {
      if (!this.addSchoolForm.value.noOfStudents) {
        delete this.addSchoolForm.value.noOfStudents;
      }
      this.apiService.addSchool(this.addSchoolForm.value as School)
        .subscribe(school => {
          this.snackBar.open('Successfully Saved', '', {
              duration: 2000
            }
          );
          this.addFormShown = false;
          form.resetForm();
          if (this.pageOffset === 0) {
            this.getSchools(this.latestFilter, false);
          }
        });
    }
  }

  getValidationMessageService(): ValidationMessagesService{
    return ValidationMessagesService;
  }

  ngOnInit(): void {
    this.getSchools();
  }

}
