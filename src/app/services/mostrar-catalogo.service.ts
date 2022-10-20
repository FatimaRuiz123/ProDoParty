import { Injectable } from '@angular/core'; {}
import { nav } from '../models/model-nav/model-nav.module'; 

@Injectable({
  providedIn: 'root'
})
export class MostrarCatalogoService {

  constructor() { }
  mostrarHome(){
    const l: nav={
      home: false,
      mesa: true,
      sill: true,
      ador: true,
      infla: true
    };
    }
}
