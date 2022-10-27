import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user/user.module';
import { Observable } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  url = "http://localhost:4400/api/Users"

  constructor(private http: HttpClient) { }

  postNewUsuari(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
