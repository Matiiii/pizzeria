import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../shared/menu.service';
import {OrderService} from '../shared/order.service';
import {Order} from '../shared/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  private  destroy$: Subject<void> = new Subject<void>();

  getOrder() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id).pipe(takeUntil(this.destroy$)).subscribe(order => this.order = order);
  }
  goBack() {
    this.location.back();
  }


  constructor(private location: Location, private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
