import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MostrarCatalogoService {
  mostral = true
  constructor() {}
  Mostrab(mostrar: boolean){
    this.mostral = mostrar;
  }
  estadoButton() {
    return this.mostral;
  }
}
