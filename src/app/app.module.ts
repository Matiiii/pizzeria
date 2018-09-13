import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    UserComponent,
    DishDetailComponent,
    CustomerComponent,
    AdminComponent,
    CartComponent,
    ConfirmComponent,
    LoginComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
