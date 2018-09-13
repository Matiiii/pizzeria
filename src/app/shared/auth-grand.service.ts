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
    return this.currentUser ? true : false;
  }

  canActivate(): boolean {

    const isLogged = this.currentUser ? true : false;

    if (isLogged) {
      return true;
    } else {
      const pathRoute = this.activatedRoute.snapshot.url;
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      console.log(id);
      if ((pathRoute.map(url => url.path)[0] === 'orders')) {
        console.log('return true');
      }
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
