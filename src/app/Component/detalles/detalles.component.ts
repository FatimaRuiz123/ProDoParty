import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit{
  name = 0;
  selected: Date | null | undefined;
  constructor() {}

  ngOnInit(): void {}
}
