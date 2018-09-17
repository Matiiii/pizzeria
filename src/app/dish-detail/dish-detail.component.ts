import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil, timeout} from 'rxjs/operators';
import {Location} from '@angular/common';
import {AuthGrandService} from '../shared/auth-grand.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit, OnDestroy {

  dish: Dish;
  private  destroy$: Subject<void> = new Subject<void>();

  getDish() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.menuService.getDishById(id).pipe(takeUntil(this.destroy$)).subscribe(dish => this.dish = dish);
  }
  save() {
    this.menuService.updateDish(this.dish);
  }
  goBack() {
    this.location.back();
  }


  constructor(private readonly location: Location,
              private readonly activatedRoute: ActivatedRoute,
              public readonly authentication: AuthGrandService,
              private readonly menuService: MenuService) { }

  ngOnInit() {
    this.getDish();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
