
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { Clientes as ClientesService } from '../servicios/clientes';
import { Pizzas as PizzasService } from '../servicios/pizzas';
import { Detalle as DetalleService } from '../servicios/detalle';

@Component({
  selector: 'app-clientes',
  imports: [ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {

  mensajeConfirmacion = '';
  guardando = false;

  constructor(
    private clientesService: ClientesService,
    private pizzasService: PizzasService,
    public detalleService: DetalleService
  ) {}

  formulario = new FormGroup({
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    fechaPedido: new FormControl('')
  });

  async terminarPedido() {

    if (this.guardando) {
      return;
    }

    this.mensajeConfirmacion = '';

    if (
      !this.formulario.value.nombre ||
      !this.formulario.value.direccion ||
      !this.formulario.value.telefono ||
      !this.formulario.value.fechaPedido
    ) {
      alert('Completa los datos del cliente');
      return;
    }

    if (this.detalleService.pizzas().length === 0) {
      alert('Agrega al menos una pizza');
      return;
    }

    let confirmar = confirm('¿Deseas terminar el pedido?');

    if (!confirmar) {
      return;
    }

    let cliente = {
      nombre: this.formulario.value.nombre,
      direccion: this.formulario.value.direccion,
      telefono: this.formulario.value.telefono,
      fechaPedido: this.formulario.value.fechaPedido,
      total: this.detalleService.calcularTotal()
    };

    this.guardando = true;

    try {

      let respuesta = await firstValueFrom(
        this.clientesService.agregarCliente(cliente)
      );

      if (!respuesta.exito || !respuesta.idCliente) {
        alert('No se pudo registrar el cliente');
        return;
      }

      let idCliente = respuesta.idCliente;

      for (let pizza of this.detalleService.pizzas()) {

        let datosPizza = {
          idCliente: idCliente,
          tamano: pizza.tamano,
          ingredientes: pizza.ingredientes,
          cantidad: pizza.cantidad,
          subtotal: pizza.subtotal
        };

        let resultado = await firstValueFrom(
          this.pizzasService.agregarPizza(datosPizza)
        );

        if (!resultado.exito) {
          throw new Error('No se pudo guardar una pizza');
        }
      }

      this.mensajeConfirmacion =
        respuesta.mensajes?.[0]?.texto ??
        'Pedido registrado correctamente. Total a pagar: $' +
        cliente.total.toFixed(2);

      this.formulario.reset({
        nombre: '',
        direccion: '',
        telefono: '',
        fechaPedido: ''
      });

  
      this.detalleService.pizzas.set([]);

    } catch (error) {

      console.error(error);
      alert(
        'Ocurrió un error al guardar el pedido. ' +
        'Revisa la base de datos antes de volver a intentarlo.'
      );

    } finally {
      this.guardando = false;
    }
  }
}
