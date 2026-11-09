
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Detalle {

  pizzas = signal<any[]>([]);

  agregarPizza(pizza: any) {
    this.pizzas.update(lista => [...lista, pizza]);
  }

  quitarPizza(indice: number) {
    this.pizzas.update(lista =>
      lista.filter((_, i) => i !== indice)
    );
  }

  calcularTotal() {
    let total = 0;

    for (let pizza of this.pizzas()) {
      total += pizza.subtotal;
    }

    return total;
  }

}
