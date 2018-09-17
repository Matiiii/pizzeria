import { Component } from '@angular/core';
import {OrderService} from './shared/order.service';
import {MenuService} from './shared/menu.service';
import {Router} from '@angular/router';
import {AuthGrandService} from './shared/auth-grand.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzeria';

  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/menu']);
  }

  navigateToAdmin() {
    this.menuService.getDishes();
    this.router.navigate(['/admin']);
  }
  navigateToAddDish() {
    this.menuService.getDishes();
    this.router.navigate(['/addDish']);
  }

  constructor(private menuService: MenuService, public authentication: AuthGrandService, private  router: Router) {
  }
}
