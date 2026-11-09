
import { Component } from '@angular/core';
import { Clientes } from './clientes/clientes';
import { Pizzas } from './pizzas/pizzas';
import { Detalle } from './detalle/detalle';
import { Ventas } from './ventas/ventas';

@Component({
  selector: 'app-root',
  imports: [Clientes, Pizzas, Detalle, Ventas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
