import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order/order.module';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url= 'http://localhost:4400/api/Orders';
  constructor(private http: HttpClient) { }

  postOrder(order:Order): Observable<Order>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Order>(this.url,order);
  }
}
