
import { Component } from '@angular/core';
import { VentasService } from '../servicios/ventas';

@Component({
  selector: 'app-ventas',
  imports: [],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas {

  ventas: any[] = [];
  pizzas: any[] = [];
  totalVentas = 0;
  tipoConsulta = '';
  idSeleccionado: number | null = null;

  diaSeleccionado = 0;

  dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];

  
mesSeleccionado = 1;

meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];


  constructor(private ventasService: VentasService) {}

  consultarDia() {
    this.ventasService.ventasDia(this.diaSeleccionado).subscribe({
      next: (respuesta) => {
        this.mostrarVentas(
          respuesta.ventas,
          this.dias[this.diaSeleccionado]
        );
      },
      error: (error) => {
        console.error(error);
        alert('Error al consultar las ventas del día');
      }
    });
  }

  
consultarMes() {
  this.ventasService.ventasMes(this.mesSeleccionado).subscribe({
    next: (respuesta) => {
      this.mostrarVentas(
        respuesta.ventas,
        this.meses[this.mesSeleccionado - 1]
      );
    },
    error: (error) => {
      console.error(error);
      alert('Error al consultar las ventas del mes');
    }
  });
}


  mostrarVentas(datos: any[], tipo: string) {
    this.ventas = datos;
    this.tipoConsulta = tipo;
    this.pizzas = [];
    this.idSeleccionado = null;

    this.totalVentas = 0;

    for (let venta of this.ventas) {
      this.totalVentas += Number(venta[5]);
    }
  }

  verDetalle(idCliente: number) {
    this.ventasService.detalleVenta(idCliente).subscribe({
      next: (respuesta) => {
        this.pizzas = respuesta.pizzas;
        this.idSeleccionado = idCliente;
      },
      error: (error) => {
        console.error(error);
        alert('Error al consultar el detalle');
      }
    });
  }
}
