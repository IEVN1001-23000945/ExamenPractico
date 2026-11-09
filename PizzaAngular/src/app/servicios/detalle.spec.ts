import { TestBed } from '@angular/core/testing';
import { Detalle } from './detalle';

describe('Detalle', () => {
  let service: Detalle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Detalle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
