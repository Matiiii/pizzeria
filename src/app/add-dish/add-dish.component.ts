import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  dish: Dish;

  addDish(): void {
    this.menuService.newDish(this.dish);
  }
  constructor(private readonly menuService: MenuService) { }

  ngOnInit() {
  }

}
