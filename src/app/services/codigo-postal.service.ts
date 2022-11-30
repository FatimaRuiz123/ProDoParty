import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodigoPostalService {
  key = '20221124-2fe6f58a5d9d5eb5/';
  api = 'https://apis.forcsec.com/api/codigos-postales/';
  codP = '37874';
  constructor(private http: HttpClient) {}

  getPostal(l:string) {
    this.codP = l;
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get(this.api +this. key + this.codP, {});
  }
}
