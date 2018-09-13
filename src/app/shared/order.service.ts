import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from './order';
import {Dish} from './dish';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('http://localhost:3000/orders');
  }
  getOrderById(id): Observable<Order> {
    return this.httpClient.get<Order>(`http://localhost:3000/orders/${id}`);
  }
  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`http://localhost:3000/orders/${order.id}`, order);
  }

  newOrder(order: Order): void {
    this.httpClient.post<Order>('http://localhost:3000/orders', order)
      .pipe(tap((savedOrder: Order) => sessionStorage.setItem('orderId', JSON.stringify(savedOrder.id)))).subscribe();
}

  constructor( private httpClient: HttpClient ) { }
}
