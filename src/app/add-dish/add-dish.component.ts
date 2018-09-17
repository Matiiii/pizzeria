import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  dish: Dish = {} as Dish;

  addDish(): void {
    this.menuService.newDish(this.dish);
  }
  goBack() {
    this.location.back();
  }
  constructor(private readonly menuService: MenuService,
              private readonly location: Location) { }

  ngOnInit() {
  }

}
