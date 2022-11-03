import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
{
}
import { nav } from '../models/model-nav/model-nav.module';

@Injectable({
  providedIn: 'root',
})
export class MostrarCatalogoService {
  // home = false;
  // mesa = true;
  // sill = true;
  // ador = true;
  // infla = true;
  mostral = true
  constructor() {}
  // mostrar(l: nav) {
  //   this.home = l.home;
  //   this.mesa= l.mesa;
  //   this.ador = l.ador;
  //   this.infla = l.infla
  //   this.sill = l.sill;
  // }
  Mostrab(mostrar: boolean){
    this.mostral = mostrar;
  }
  // estadoHome() {
  //   return this.home;
  // }
  // estadoMesa() {
  //   return this.mesa;
  // }
  // estadoSill() {
  //   return this.sill;
  // }
  // estadoAdor() {
  //   return this.ador;
  // }
  // estadoInfla() {
  //   return this.infla;
  // }
  estadoButton() {
    return this.mostral;
  }
}
