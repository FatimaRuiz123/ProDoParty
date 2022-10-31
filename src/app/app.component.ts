import { Component, DoCheck, OnInit } from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';
import { nav } from './models/model-nav/model-nav.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'DoParty';
  mostrar = false;
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService,
    private router: Router
  ) {}
  ngDoCheck() {
    this.mostrar = this.mostrarCatalogoService.estadoButton();
  }

  ngOnInit() {
    if (localStorage.getItem('user') === '') {
      
    }
  }
  mostrarCatalogo() {
    const l: nav = {
      home: false,
      mesa: true,
      sill: true,
      ador: true,
      infla: true,
    };
    this.mostrarCatalogoService.mostrar(l);
    this.router.navigateByUrl('/home');
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
    this.router.navigateByUrl('/home');
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
    this.router.navigateByUrl('/home');
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
    this.router.navigateByUrl('/home');
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
    this.router.navigateByUrl('/home');
  }
  mostrarCarrito() {}
  salir() {
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }
}
