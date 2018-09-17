import {Injectable, OnInit} from '@angular/core';
import {Dish} from './dish';
import {takeUntil} from 'rxjs/operators';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  products: Dish[] = (JSON.parse(localStorage.getItem('basket') ? localStorage.getItem('basket') : '[]') as Dish[]);

  add(product: Dish) {
    this.products.push(product);
    localStorage.setItem('basket', JSON.stringify(this.products));
  }

  deleteDish(product: Dish) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(this.products));
  }

  clear() {
    this.products = [];
    localStorage.setItem('basket', JSON.stringify(this.products));
  }

  getSum(): string {
    const tab = this.products.map(e => parseFloat(String(e.price)));
    return tab.reduce(function (previousValue, currentValue) {
      return (previousValue + currentValue);
    }).toFixed(2);

  }

  ngOnInit() {

  }

  constructor() {
  }
}
