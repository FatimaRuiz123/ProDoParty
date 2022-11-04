import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart,CartCostmer } from '../models/cart/cart.module';

@Injectable({
  providedIn: 'root'
})
export class UpdateCartProductsService {
  url3 = 'http://localhost:4400/api/Cart/'
  constructor(private http: HttpClient) { }

  ubdateCart(id: string, cart:Cart): Observable<Cart> {
    return this.http.put<Cart>(this.url3 + id, cart)
  }
}
