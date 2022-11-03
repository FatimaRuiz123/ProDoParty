import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart,CartCostmer } from '../models/cart/cart.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url= 'http://localhost:4400/api/Carts'
  url2= 'http://localhost:4400/api/CartCostume'
  url3 = 'http://localhost:4400/api/Cart/'
  constructor(private http: HttpClient) { }

  postCart(cart:Cart): Observable<Cart>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Cart>(this.url,cart);
  }
  getCart(cartCostmer: CartCostmer): Observable<Cart>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Cart>(this.url2,cartCostmer);
  }
  ubdateCart(id: string, cart:Cart): Observable<Cart> {
    return this.http.put<Cart>(this.url3 + id, cart)
  }
  deleteCart(id: string): Observable<Cart> {
    return this.http.delete<Cart>(this.url3 + id)
  }

}
