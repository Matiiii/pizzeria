import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dish} from './dish';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable, Subject} from 'rxjs';
import {d} from '@angular/core/src/render3';
import {AuthGrandService} from './auth-grand.service';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes$ = new Subject<Dish[]>();


get(url: string) {
  if (this.authservice.canShow()) {
    this.httpClient.get<Dish[]>(url).subscribe(dishes => this.dishes$.next(dishes));
  } else {
    this.httpClient.get<Dish[]>(url, {params: { isAvailable: 'true'}})
      .subscribe(dishes => this.dishes$.next(dishes));
  }
}

 getDishes() {
  this.get('http://localhost:3000/dishes');
}
  getPastas() {
    this.get('http://localhost:3000/dishes?type=spagetti');
  }

  getPizzas() {
    this.get('http://localhost:3000/dishes?type=pizza');
  }

  getDrinks() {
    this.get('http://localhost:3000/dishes?type=drink');
  }
getDishById(id: number): Observable<Dish> {
   return this.httpClient.get<Dish>(`http://localhost:3000/dishes/${id}`);
}
newDish(dish: Dish): void {
   this.httpClient.post(  'http://localhost:3000/dishes', dish).subscribe(res => this.getDishes());
}
  constructor(private httpClient: HttpClient, private authservice: AuthGrandService ) {}
}
