import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {School} from './app.school';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getSchools(filterValue?: string): Observable<School[]>{
    if (filterValue) {
      filterValue = '?search=' + filterValue;
    } else {
      filterValue = '';
    }
    return this.http.get<School[]>('http://127.0.0.1:3000/schools' + filterValue);
  }
}
