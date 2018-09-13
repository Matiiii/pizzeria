import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import {MenuService} from './menu.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Dish} from './dish';
import {AuthGrandService} from './auth-grand.service';
import {Subject} from 'rxjs';
import {CartService} from './cart.service';
import {Router} from '@angular/router';

describe('MenuService', () => {
  let service: MenuService;
  let authService: AuthGrandService;


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

  let mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService,
        AuthGrandService,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.get(MenuService);
    mockBackend = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthGrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Dish equals mockedDish', fakeAsync(() => {
    // given
    let dish: Dish;

    // when

    service.getDishById(100).subscribe(res => dish = res);
    mockBackend.expectOne('http://localhost:3000/dishes/' + mockedDish.id).flush(mockedDish);

    expect(dish).toEqual(mockedDish);

  }));
  it('should get mockedDishes ',
    fakeAsync(() => {

      // given
      spyOn(authService, 'canShow').and.returnValue(true);
      let dishes: Dish[];
      service.dishes$.subscribe(res => dishes = res);

      // when
      service.getPastas();
      mockBackend.expectOne('http://localhost:3000/dishes?type=spagetti').flush(mockedDishes);

      expect(dishes).toEqual(mockedDishes);
    }));

  it('should get mockedDishes when ',
    fakeAsync(() => {

      // given
      spyOn(authService, 'canShow').and.returnValue(false);
      let dishes: Dish[];
      service.dishes$.subscribe(res => dishes = res);

      // when
      service.getPastas();
      mockBackend.expectOne('http://localhost:3000/dishes?type=spagetti&isAvailable=true').flush(mockedDishes);

      expect(dishes).toEqual(mockedDishes);
    }));

  it('should get mockedDishes when sdf',
    fakeAsync(() => {

      // given
      spyOn(authService, 'canShow').and.returnValue(false);
      let dishes: Dish[];
      service.dishes$.subscribe(res => dishes = res);

      // when
      service.getDishes();
      mockBackend.expectOne('http://localhost:3000/dishes?isAvailable=true');
    }));


});
