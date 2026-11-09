
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Clientes {

  constructor(private http: HttpClient) {}

  agregarCliente(cliente: any) {
    return this.http.post<any>(
      'http://127.0.0.1:5000/clientes',
      cliente
    );
  }

}
