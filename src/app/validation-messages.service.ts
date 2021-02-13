import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {

  constructor() {}

  public static readonly REQUIRED = 'Required';
  public static readonly POSITIVE_INTEGER = 'Should be a positive integer';
}
