import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MenuService} from '../shared/menu.service';
import {Router, RouterModule} from '@angular/router';
import {CartService} from '../shared/cart.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {pipe, Subject} from 'rxjs';
import {Dish} from '../shared/dish';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: MenuService;

  const cartServiceMock = {
    add: jasmine.createSpy('add')
  };
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    getPizzas: jasmine.createSpy('getPizzas'),
    getPastas: jasmine.createSpy('getPastas'),
    getDrinks: jasmine.createSpy('getDrinks'),
    dishes$: new Subject<Dish[]>()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        {provide: MenuService, useValue: menuServiceMock},
        {provide: CartService, useValue: cartServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(MenuService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getDishes in menuService', () => {
    component.getDishes();

    expect(service.getDishes).toHaveBeenCalled();
  });
  it('should ude getPizzas in menuService', () => {
    component.getPizzas();

    expect(service.getPizzas).toHaveBeenCalled();
  });
  it('should ude getPastas in menuService', () => {
    component.getPastas();

    expect(service.getPastas).toHaveBeenCalled();
  });

  it('should ude getDrinks in menuService', () => {
    component.getDrinks();

    expect(service.getDrinks).toHaveBeenCalled();
  });



});
