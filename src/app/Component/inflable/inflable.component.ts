import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Type } from 'src/app/models/product/product.module';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-inflable',
  template: `
    <div>
      <div class="container">
        <a
          class="list-group-item list-group-item-action active"
          aria-current="true"
        >
          <h1>Inflable</h1>
        </a>
        <div class="row justify-content-around">
          <div
            *ngFor="let item of inflables"
            class="card col-md-4"
            style="width: 18rem"
          >
            <img [src]="item.imagePath" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title">{{ item.Name }}</h5>
              <p class="card-text">{{ item.Description }}</p>
              <a class="btn btn-primary" (click)="detalles('' + item.id)"
                >Ver detalles de renta</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./inflable.component.css']
})
export class InflableComponent implements OnInit {

  inflables: Product[]= [];
  url = 'http://localhost:4400/';
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProductsType('inflable');
  }
  getProductsType(typ: string) {
    const type: Type = {
      Type: typ,
    };
    this.productsService.getProducts(type).subscribe((prod: any) => {
      for (let i = 0; i < prod.length; i++) {
        const l = prod[i];
        const pro: Product = {
          id: l._id,
          Name: l.Name,
          Description: l.Description,
          TotalProduct: l.TotalProduct,
          TotalStock: l.TotalStock,
          TotalService: l.TotalService,
          Type: l.Type,
          Price: l.Price,
          imagePath: this.url + l.imagePath,
        };
        this.inflables[i] = pro;
      }
    });
  }
  detalles(id: string) {
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details');
  }


}
