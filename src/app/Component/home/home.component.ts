import { Component, DoCheck, OnInit } from '@angular/core';
import { Product, Type } from 'src/app/models/product/product.module';
import { MostrarCatalogoService } from 'src/app/services/mostrar-catalogo.service';
import { ProductsService } from 'src/app/services/products.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  secretKey = 'YourSecretKeyForEncryption&Descryption';
  home = false;
  mesa = false;
  sill = true;
  ador = true;
  infla = true;
  url = 'http://localhost:4400/';
  silla: Product[] = [];
  sillaRandom: Product[] = [];
  sillas: Product[] = [];
  _mesa: Product[] = [];
  mesaRandom: Product[] = [];
  mesas: Product[] = [];
  adorno: Product[] = [];
  adornoRandom: Product[] = [];
  adornos: Product[] = [];
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getsillasHome('silla');
    this.getProductsType('silla');
    this.getsillasHome('mesa');
    this.getProductsType('mesa');
    this.getsillasHome('adorno');
    this.getProductsType('adorno');
    this.mostrarCatalogoService.Mostrab(false)
  }
  se() {
    this.home = this.mostrarCatalogoService.estadoHome();
    this.mesa = this.mostrarCatalogoService.estadoMesa();
    this.sill = this.mostrarCatalogoService.estadoSill();
    this.infla = this.mostrarCatalogoService.estadoInfla();
    this.ador = this.mostrarCatalogoService.estadoAdor();
  }
  ngDoCheck() {
    this.se();
  }
  getsillasHome(typ: string) {
    const type: Type = {
      Type: typ,
    };
    this.productsService.getProductsN(type).subscribe((products: any) => {
      for (let i = 0; i < products.length; i++) {
        const l = products[i];
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
        switch (typ) {
          case 'silla': {
            this.silla[i] = pro;
            break;
          }
          case 'mesa': {
            this._mesa[i] = pro;
            break;
          }
          case 'adorno': {
            this.adorno[i] = pro;
            break;
          }
          default: {
            //statements;
            break;
          }
        }
      }
      const r = Math.floor(Math.random() * 4);
      switch (typ) {
        case 'silla': {
          this.sillaRandom[0] = this.silla[r];
          break;
        }
        case 'mesa': {
          this.mesaRandom[0] = this._mesa[r];
          break;
        }
        case 'adorno': {
          this.adornoRandom[0] = this.adorno[r];
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    });
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
        switch (typ) {
          case 'silla': {
            this.sillas[i] = pro;
            break;
          }
          case 'mesa': {
            this.mesas[i] = pro;
            break;
          }
          case 'adorno': {
            this.adornos[i] = pro;
            break;
          }
          default: {
            //statements;
            break;
          }
        }
      }
    });
  }
  detalles(id: string){
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details')
  }
}
