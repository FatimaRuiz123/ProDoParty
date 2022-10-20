import { Component, OnInit } from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DoParty';
  constructor(private mostrarCatalogoService: MostrarCatalogoService) {}

  ngOnInit(): void {}
  mostrarCatalogo() {
    this.mostrarCatalogoService.mostrarSillas();
  }
}
