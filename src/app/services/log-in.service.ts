import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user/user.module';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  url = "http://localhost:4400/api/Users"
  constructor(private http: HttpClient) { }
  getUser(){
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.http.get<User>(this.url, {
  });
  }
}
