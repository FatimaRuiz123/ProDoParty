import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Type } from 'src/app/models/product/product.module';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-silla',
  template: `
    <div class="lgd">
      <div class="container-fluid pt-5 pb-3 ">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4" style="color:white;"><span
            class="pr-3">Sillas</span></h2>
        <div class="row px-xl-5">
          <div *ngFor="let silla of sillas" class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4" (click)="detalles('' + silla.id)">
              <div class="product-img position-relative overflow-hidden">
                <img [src]="silla.imagePath" class="img-fluid w-100" alt="" />
                <div class="product-action">
                  <a class="btn btn-outline-dark" style="border-radius: 10px;">Ver
                    Detalles&nbsp;&nbsp;&nbsp;<i class="fa fa-search"></i></a>
                </div>
                <div class="text-center py-4">
                  <a class="h6 text-decoration-none text-truncate">{{ silla.Name }}</a>
                  <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>{{ silla.Description }}</h5>
                    <h6 class="text-muted ml-2"><del></del></h6>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="container-fluid pb-3 "></div>
  `,
  styleUrls: ['./silla.component.css']
})
export class SillaComponent implements OnInit {
  sillas: Product[]= [];
  url = 'http://localhost:4400/';
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProductsType('silla');
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
        this.sillas[i] = pro;
      }
    });
  }
  detalles(id: string) {
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details');
  }

}
