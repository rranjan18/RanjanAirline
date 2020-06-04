import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  REST_URL = '/assets/';
  constructor(private http: HttpClient) { }

  getDetails(){
    return this.http.get(`${this.REST_URL}/details.json`);
  }
}
