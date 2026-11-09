
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) {}

  ventasDia(dia: number) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/ventas/dia?dia=' + dia
    );
  }

  
ventasMes(mes: number) {
  return this.http.get<any>(
    'http://127.0.0.1:5000/ventas/mes?mes=' + mes
  );
}


  detalleVenta(idCliente: number) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/ventas/detalle/' + idCliente
    );
  }
}
