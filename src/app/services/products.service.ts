import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product,Type } from '../models/product/product.module';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProductsType(type: Type) {
    throw new Error('Method not implemented.');
  }
  url = 'http://localhost:4400/api/Product/type';
  url2 = 'http://localhost:4400/api/Prod/type';
  url3 = 'http://localhost:4400/api/Product/'
  constructor(private http: HttpClient) {}

  getProductsN(type:Type): Observable<Type>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Type>(this.url,type);
  }
  getProducts(type:Type): Observable<Type>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Type>(this.url2,type);
  }
  getProductId(id: string):Observable<any>{
    return this.http.get<Product>(this.url3 + id);
  }

}
