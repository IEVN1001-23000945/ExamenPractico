
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Pizzas {

  constructor(private http: HttpClient) {}

  agregarPizza(pizza: any) {
    return this.http.post<any>(
      'http://127.0.0.1:5000/pizzas',
      pizza
    );
  }

}
