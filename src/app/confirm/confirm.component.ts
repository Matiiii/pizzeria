import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../shared/order';
import {Dish} from '../shared/dish';
import {Customer} from '../shared/customer';
import {OrderService} from '../shared/order.service';
import {Router} from '@angular/router';
import {CartService} from '../shared/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  customer: Customer = {} as Customer;
  order: Order = {} as Order;
  dishes: Dish[] = [];
  dishesIds: number[] = [];
  private  destroy$: Subject<void> = new Subject<void>();

  customerForm: FormGroup;
  submitted = false;
  isCart = (!!localStorage.getItem('basket')) ? JSON.parse(localStorage.getItem('basket')).length > 0 : false ;

  // convenience getter for easy access to form fields
  get f() {
    return this.customerForm.controls;
  }

  constructor(private cartService: CartService,
              private router: Router,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
  }

  saveOrder() {
    this.dishes = (JSON.parse(localStorage.getItem('basket') ? localStorage.getItem('basket') : '[]') as Dish[]);
    if (this.dishes.length < 1) {
      alert('Koszyk nie może by pusty!');
      this.router.navigate(['/menu']);
      return ;
    }
    this.dishesIds = this.dishes.map(dish => dish.id);
    this.order.dishIds = this.dishesIds;
    this.order.status = 'Oczekuje na przyjęcie';
    this.order.customer = this.customer;
    this.order.price = parseFloat(this.cartService.getSum());
    localStorage.removeItem('basket');
    this.orderService.newOrder(this.order).pipe(takeUntil(this.destroy$)).subscribe( () =>

      this.router.navigate(['/orders/detail/' + sessionStorage.getItem('orderId')])
    );

  }
  onSubmit() {
    this.submitted = true;
    this.customer.name = this.customerForm.get('name').value;
    this.customer.surname = this.customerForm.get('surname').value;
    this.customer.phone = this.customerForm.get('phone').value;
    this.customer.city = this.customerForm.get('city').value;
    this.customer.street = this.customerForm.get('street').value;
    this.customer.hause = this.customerForm.get('hause').value;
    this.customer.flatNumber = this.customerForm.get('flatNumber').value;
    this.order.date = moment().format('YYYY-MM-DD HH:mm');

    if (this.customerForm.invalid) {
      return;
    }

    this.saveOrder();

  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({

      name: ['',
        [
          Validators.required,
        ]
      ],
      surname: ['',
        [
          Validators.required,
          Validators.minLength(2),
        ]],
      phone: ['',
        [
          Validators.required,
        ]
      ],
      city: ['',
        [
          Validators.required,
          Validators.minLength(3),
        ]],
      street: ['',
        [
          Validators.required,
          Validators.minLength(4),
        ]
      ],
      hause: ['',
        [
          Validators.required,
        ]],
      flatNumber: ['',
        [

        ]],
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
