import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pizzas } from './pizzas';

describe('Pizzas', () => {
  let component: Pizzas;
  let fixture: ComponentFixture<Pizzas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pizzas],
    }).compileComponents();

    fixture = TestBed.createComponent(Pizzas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
