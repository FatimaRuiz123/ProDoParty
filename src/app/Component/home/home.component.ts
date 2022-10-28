import { Component, DoCheck, OnInit } from '@angular/core';
import { MostrarCatalogoService } from 'src/app/services/mostrar-catalogo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  home = false;
  mesa = false;
  sill = true;
  ador = true;
  infla = true;
  images=['hbjvdb','khhfjf','fbdvf m','bfvdvbhm']
  constructor(private mostrarCatalogoService: MostrarCatalogoService) {

  }

  ngOnInit() {

  }
  se() {
    this.home = this.mostrarCatalogoService.estadoHome();
    this.mesa = this.mostrarCatalogoService.estadoMesa();
    this.sill = this.mostrarCatalogoService.estadoSill();
    this.infla = this.mostrarCatalogoService.estadoInfla();
    this.ador = this.mostrarCatalogoService.estadoAdor();
  }
  ngDoCheck(){
    this.se()
  }
}
