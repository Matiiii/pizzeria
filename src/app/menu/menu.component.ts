import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CartService} from '../shared/cart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  dishes2$: Subject<Dish[]>;

  dishes: Dish[];


  taco: Dish = {
    name: 'taco',
    isAvailable: true,
    type: 'fastfood',
    description: 'pyszne taco ',
    price: 200,
  };

  navigateTo(dishId: number) {
    this.router.navigate(['/menu', dishId]);
  }

  addDish(): void {
    this.menuService.newDish(this.taco);
  }

  getPastas(): void {
    this.menuService.getPastas();
  }

  getPizzas() {
    this.menuService.getPizzas();
  }

  getDrinks() {
    this.menuService.getDrinks();
  }

  getDishes() {
    this.menuService.dishes$.pipe(takeUntil(this.destroy$)).subscribe(dishes => this.dishes = dishes);
  }

  addDishToCart(dish: Dish): void {
    this.cartService.add(dish);
  }

  constructor(private cartService: CartService, private menuService: MenuService, private router: Router) {
  }

  ngOnInit() {
    this.getDishes();
    this.menuService.getDishes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
