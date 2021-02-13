import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public static readonly SERVER_API_URL = 'http://127.0.0.1:3000';
  public static readonly NO_RECORDS_PER_PAGE = 10;
}
