import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../shared/menu.service';
import {OrderService} from '../shared/order.service';
import {Order} from '../shared/order';
import {AuthGrandService} from '../shared/auth-grand.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  dishes: Dish[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  getDishes() {
    this.order.dishIds.forEach(dishId => {
      this.menuService.getDishById(dishId).subscribe(dish => {this.dishes.push(dish); });
    });
  }

  confirm() {
      const r = confirm('Czy na pewno chcesz usunąć to zamówienie');
      if (r === true) {
      this.deleteOrder();
      }
  }
  getOrder() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id).pipe(takeUntil(this.destroy$)).subscribe(order => {
      this.order = order;
      this.getDishes();
    });
  }
  getDate(): string {
    const date = this.order.date;
    return date;
  }
  deleteOrder() {
    this.orderService.deleteOrder(this.order);
    this.goBack();
  }
  changeStatus(status: string) {
    this.order.status = status;
    this.orderService.updateOrder(this.order).pipe(takeUntil(this.destroy$)).subscribe();
  }
  changeStatusToCompleted() {
   this.changeStatus('Dostarczone');
  }
  changeStatusToInRealization() {
    this.changeStatus('W przygotowaniu');
  }
  changeStatusToProcessing() {
    this.changeStatus('Oczekuje na przyjęcie');
  }
  changeStatusToInDelivery() {
    this.changeStatus('W dostarczeniu');
  }



  goBack() {
    this.location.back();
  }


  constructor(private readonly location: Location,
              private readonly menuService: MenuService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly orderService: OrderService,
              public  readonly authentication: AuthGrandService) {
  }

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
