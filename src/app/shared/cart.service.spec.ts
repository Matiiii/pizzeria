import {TestBed, inject} from '@angular/core/testing';
import {CartService} from './cart.service';
import {Dish} from './dish';
import {stringify} from 'querystring';

describe('CartService', () => {

  let service: CartService;

  const mockedDish: Dish = {
    id: 100,
    name: 'mockedDish',
    isAvailable: true,
    type: 'fastfood',
    description: 'pyszne taco ',
    price: 20,
  };

  const mockedPizza1: Dish = {
    id: 1,
    name: 'mockedPizza1',
    isAvailable: true,
    type: 'pizza',
    description: 'pyszna pizza ',
    price: 10,
  };
  const mockedPasta2: Dish = {
    id: 2,
    name: 'mockedPasta2',
    isAvailable: false,
    type: 'spagetti',
    description: 'pyszne spagetti 2',
    price: 15,
  };
  const mockedPasta3: Dish = {
    id: 3,
    name: 'mockedPasta3',
    isAvailable: false,
    type: 'spagetti',
    description: 'pyszne spagetti 3',
    price: 20,
  };

  const mockedDishes: Dish[] = [mockedPizza1, mockedPasta2, mockedPasta3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.get(CartService);
    service.products = [];
    localStorage.removeItem('basket');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add product to card', () => {
    // given
    // when
    expect(service.products.length).toBe(0);
    service.add(mockedPizza1);
    // then
    expect(service.products.length).toBe(1);
    expect(JSON.parse(localStorage.getItem('basket')).length).toBe(1);
  });
  it('should remove product from product list', () => {
    // given
    service.products = mockedDishes;
    // when
    expect(service.products.length).toBe(3);
    service.deleteDish(mockedPizza1);
    // then
    expect(service.products.length).toBe(2);
    expect(service.products.indexOf(mockedPizza1)).toBe(-1);
    expect(JSON.parse(localStorage.getItem('basket')).length).toBe(2);
  });
  it('should delete products from product list', () => {
    // given
    service.products = mockedDishes;
    // when
    expect(service.products.length).toBe(3);
    service.clear();
    // then
    expect(service.products.length).toBe(0);
    expect(JSON.parse(localStorage.getItem('basket')).length).toBe(0);
  });
  it('should return sum of  products price from product list', () => {
    // given
    let result: string;
    service.products = mockedDishes;
    // when
    result = service.getSum();
    // then
    expect(result).toBe('45.00');
  });


});
