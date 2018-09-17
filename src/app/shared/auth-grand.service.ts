import {ActivatedRoute, CanActivate, ParamMap, Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Observable, Subject} from 'rxjs';
import {filter, first, map, take, takeUntil} from 'rxjs/operators';
import {mapToMapExpression} from '@angular/compiler/src/render3/util';
import {Dish} from './dish';
import {MenuService} from './menu.service';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGrandService implements CanActivate, OnDestroy {


  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  user: User;
  currentUser: User = (JSON.parse(sessionStorage.getItem('currentUser') ? sessionStorage.getItem('currentUser') : null) as User);
  private destroy$: Subject<void> = new Subject<void>();


  login(name: string, password: string): void {
    this.user = null;
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    this.userService.getUser(name).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.user = res.pop();

        if (this.user) {
          if (this.user.password === password) {
            this.currentUser = this.user;
            sessionStorage.setItem('currentUser', JSON.stringify(this.user));
            sessionStorage.removeItem('errorLogin');
            this.router.navigate(['/admin']);
          } else {
            sessionStorage.setItem('errorLogin', 'Błędne hasło');
          }
        } else {
          sessionStorage.setItem('errorLogin', 'Nie ma takiego użytkownika');
          this.currentUser = null;
        }

      });



  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/menu']);
  }

  canShow(): boolean {
    return !!this.currentUser;
  }

  isMyOrder(): boolean {
    const id = this.activatedRoute.snapshot.root.children[0].params.id;
    // console.log(param);
   // const id = this.activatedRoute.snapshot.root.children[0].paramMap.get('id');
    const sesOrderId = sessionStorage.getItem('orderId');
    return (id.toString() === sesOrderId);
  }

  canActivate(): boolean {
    const isLogged = !!this.currentUser;
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
