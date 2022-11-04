import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.module';
import { ProductsService } from 'src/app/services/products.service';
import { OrderProduct } from 'src/app/models/order/order.module';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit, DoCheck {
  cantidad = 0;
  url = 'http://localhost:4400/';
  product: Product[] = [];
  value: any;
  total = 0;
  idProduct = localStorage.getItem('idProduct');
  tr= this.idProduct;
  constructor(private productsService: ProductsService,private snackBar: MatSnackBar,private processPaymentService: ProcessPaymentService) {
  }
  ngDoCheck(): void {
    this.idProduct = localStorage.getItem('idProduct');
    if (this.tr != this.idProduct){
      this.getProductId();
      this.tr = localStorage.getItem('idProduct')
    }
  }
  
  ngOnInit() {
    this.getProductId();
  }
  getProductId() {
    this.productsService
      .getProductId('' + this.idProduct)
      .subscribe((products: any) => {
        const l = products.product;
        const product: Product = {
          Name: l.Name,
          Description: l.Description,
          TotalProduct: l.TotalProduct,
          TotalStock: l.TotalStock,
          TotalService: l.TotalService,
          Type: l.Type,
          Price: l.Price,
          imagePath: this.url + l.imagePath,
        };

        this.product[0] = product;
      });
  }
  mas() {
    this.cantidad = Number(this.cantidad) + 1;
    this.total = Number(this.cantidad) * this.product[0].Price;
  }
  menos() {
    if (this.cantidad >= 1) {
      this.cantidad = Number(this.cantidad) - 1;
      this.total = Number(this.cantidad) * this.product[0].Price;
    }
  }
  
  resume() {
    this.total = (Number(this.cantidad) * this.product[0].Price);
  }
  selectChange(select: Date): void {
  }
  agregarCart() {
    if (this.cantidad >= 1) {
      const pr = this.product[0];
      const cart: OrderProduct = {
        IdProducts: '' + this.idProduct,
        Amount: this.cantidad,
        Name: pr.Name,
        Description: pr.Description,
        Total: this.total,
        UrlImage: pr.imagePath
      };
     this.processPaymentService.cargandoProduct(cart);
     if(this.product[0].TotalStock < Number(this.cantidad)){
      this.alert('solo se le pueden ofrecer '+this.product[0].TotalStock)
      this.cantidad = Number(this.product[0].TotalStock);
     }
    }else this.alert('No se puede agregar al camioncito si no son mas de una pieza')
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
}
