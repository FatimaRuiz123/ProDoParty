import { Component, OnInit } from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';
import { nav } from './models/model-nav/model-nav.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DoParty';
  constructor(private mostrarCatalogoService: MostrarCatalogoService) {}

  ngOnInit() {}
  mostrarCatalogo() {
    const l: nav = {
      home: false,
      mesa: true,
      sill: true,
      ador: true,
      infla: true,
    };
    this.mostrarCatalogoService.mostrar(l);
  }
  mostrarSillas() {
    const l: nav = {
      home: true,
      mesa: true,
      sill: false,
      ador: true,
      infla: true,
    };
    this.mostrarCatalogoService.mostrar(l);
  }
  mostrarMesas() {
    const l: nav = {
      home: true,
      mesa: false,
      sill: true,
      ador: true,
      infla: true,
    };
    this.mostrarCatalogoService.mostrar(l);
  }
  mostrarInflables() {
    const l: nav = {
      home: true,
      mesa: true,
      sill: true,
      ador: true,
      infla: false,
    };
    this.mostrarCatalogoService.mostrar(l);
  }
  mostrarAdornos() {
    const l: nav = {
      home: true,
      mesa: true,
      sill: true,
      ador: false,
      infla: true,
    };
    this.mostrarCatalogoService.mostrar(l);
  }
}
