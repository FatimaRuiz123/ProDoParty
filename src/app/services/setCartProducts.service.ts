import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart,CartCostmer } from '../models/cart/cart.module';
@Injectable({
  providedIn: 'root'
})
export class SetCartProductsService {
  url= 'http://localhost:4400/api/Carts'
  constructor(private http: HttpClient) { }

  postCart(cart:Cart): Observable<Cart>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Cart>(this.url,cart);
  }
}
