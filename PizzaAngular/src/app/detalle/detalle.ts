
import { Component } from '@angular/core';
import { Detalle as DetalleService } from '../servicios/detalle';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {

  constructor(public detalleService: DetalleService) {}

  quitarPizza(indice: number) {
    this.detalleService.quitarPizza(indice);
  }

}
