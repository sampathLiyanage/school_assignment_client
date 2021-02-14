import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ValidationMessagesService} from '../validation-messages.service';
import {School} from '../app.school';
import {ApiService} from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  validationMessagesService = ValidationMessagesService;

  @Output() schoolSave = new EventEmitter<string>();
  @Output() cancelButtonClick = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

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
          form.resetForm();
          this.schoolSave.emit();
        });
    }
  }

  ngOnInit(): void {
  }

}
