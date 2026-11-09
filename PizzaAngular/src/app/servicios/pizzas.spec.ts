import { TestBed } from '@angular/core/testing';
import { Pizzas } from './pizzas';

describe('Pizzas', () => {
  let service: Pizzas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pizzas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
