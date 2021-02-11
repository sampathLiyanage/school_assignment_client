import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {School} from './app.school';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getSchools(filterValue?: string): Observable<School[]>{
    filterValue = filterValue ? '?' + filterValue : '';
    return this.http.get<School[]>(ConfigService.SERVER_API_URL + filterValue);
  }
}
