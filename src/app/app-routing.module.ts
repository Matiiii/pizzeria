import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {OrderComponent} from './order/order.component';
import {CustomerComponent} from './customer/customer.component';
import {AdminComponent} from './admin/admin.component';
import {DishDetailComponent} from './dish-detail/dish-detail.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {AuthGrandService} from './shared/auth-grand.service';
import {LoginComponent} from './login/login.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AddDishComponent} from './add-dish/add-dish.component';

const routes: Routes = [
  {path: 'menu',  component: CustomerComponent},
  {path: 'admin', canActivate: [AuthGrandService], component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: CustomerComponent},
  {path: 'dish/detail/:id', component: DishDetailComponent},
  {path: 'orders/detail/:id', component: OrderDetailComponent},
  {path: 'confirm', component: ConfirmComponent},
  {path: 'addDish', canActivate: [AuthGrandService], component: AddDishComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
