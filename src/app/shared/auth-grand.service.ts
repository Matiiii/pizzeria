import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Observable, Subject} from 'rxjs';
import {filter, first, map, take, takeUntil} from 'rxjs/operators';
import {mapToMapExpression} from '@angular/compiler/src/render3/util';
import {Dish} from './dish';
import {MenuService} from './menu.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGrandService implements CanActivate, OnDestroy {


  constructor(private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              ) {
  }

  user: User;
  currentUser: User = (JSON.parse(sessionStorage.getItem('currentUser') ? sessionStorage.getItem('currentUser') : null) as User);
  private destroy$: Subject<void> = new Subject<void>();


  login(name: string, password: string) {
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
            this.router.navigate(['/admin']);
          } else {
            console.log('invalid password');
          }
        } else {
          console.log('invalid login');
          this.currentUser = null;
        }
      });


  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    // this.menuService.getDishes();
    this.router.navigate(['/menu']);
  }

  canShow(): boolean {
    return !!this.currentUser;
  }
  isMyOrder(): boolean {
    const id = this.activatedRoute.snapshot.root.children.pop().paramMap.get('id');
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
