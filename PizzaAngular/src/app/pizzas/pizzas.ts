
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Detalle } from '../servicios/detalle';

@Component({
  selector: 'app-pizzas',
  imports: [ReactiveFormsModule],
  templateUrl: './pizzas.html',
  styleUrl: './pizzas.css'
})
export class Pizzas {

  constructor(public detalleService: Detalle) {}

  formulario = new FormGroup({
    tamano: new FormControl('Chica'),
    jamon: new FormControl(false),
    pina: new FormControl(false),
    champinones: new FormControl(false),
    cantidad: new FormControl(1)
  });

  subtotal = 0;

  calcularSubtotal() {

    let precio = 0;

    if (this.formulario.value.tamano === 'Chica') {
      precio = 40;
    }

    if (this.formulario.value.tamano === 'Mediana') {
      precio = 80;
    }

    if (this.formulario.value.tamano === 'Grande') {
      precio = 120;
    }

    if (this.formulario.value.jamon) {
      precio += 10;
    }

    if (this.formulario.value.pina) {
      precio += 10;
    }

    if (this.formulario.value.champinones) {
      precio += 10;
    }

    let cantidad = Number(this.formulario.value.cantidad);

    this.subtotal = precio * cantidad;
  }

  agregarPizza() {

    this.calcularSubtotal();

    let cantidad = Number(this.formulario.value.cantidad);

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      alert('La cantidad debe ser mayor a cero');
      return;
    }

    let ingredientes = '';

    if (this.formulario.value.jamon) {
      ingredientes += 'Jamón, ';
    }

    if (this.formulario.value.pina) {
      ingredientes += 'Piña, ';
    }

    if (this.formulario.value.champinones) {
      ingredientes += 'Champiñones, ';
    }

    if (ingredientes === '') {
      ingredientes = 'Sin ingredientes';
    } else {
      ingredientes = ingredientes.slice(0, -2);
    }

    let pizza = {
      tamano: this.formulario.value.tamano,
      ingredientes: ingredientes,
      cantidad: cantidad,
      subtotal: this.subtotal
    };

    this.detalleService.agregarPizza(pizza);
console.log('Lista de pizzas:', this.detalleService.pizzas());

    this.formulario.reset({
      tamano: 'Chica',
      jamon: false,
      pina: false,
      champinones: false,
      cantidad: 1
    });

    this.subtotal = 0;
  }

}
