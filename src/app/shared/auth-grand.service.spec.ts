import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {AuthGrandService} from './auth-grand.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from './user.service';
import {Dish} from './dish';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, convertToParamMap, Router, UrlSegmentGroup} from '@angular/router';


describe('AuthGrandService', () => {
  let service: AuthGrandService;
  let userService: UserService;
  let mockBackend: HttpClientTestingModule;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockedUser: User = {
    name: 'user',
    password: 'user'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGrandService,
        UserService ] ,
      imports: [RouterTestingModule, HttpClientTestingModule ]
    });
    service = TestBed.get(AuthGrandService);
    userService = TestBed.get(UserService);
    mockBackend = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log user with correct name and pass',
    fakeAsync(() => {

      // given
      spyOn(userService, 'getUser').and.returnValue(of([mockedUser]));
      spyOn(router, 'navigate').and.returnValue('');

      // when
      service.login('user', 'user');

      // then
      expect(userService.getUser).toHaveBeenCalled();
      expect(service.user).toEqual(mockedUser);
      expect(service.currentUser).toEqual(mockedUser);
      expect(router.navigate).toHaveBeenCalled();
    }));

  it('should not log user with correct name and incorrect pass',
    fakeAsync(() => {

      // given
      spyOn(userService, 'getUser').and.returnValue(of([mockedUser]));
      spyOn(router, 'navigate').and.returnValue('');

      // when
      service.login('user', 'malpiszon');

      // then
      expect(userService.getUser).toHaveBeenCalled();
      expect(service.user).toEqual(mockedUser);
      expect(service.currentUser).not.toEqual(mockedUser);
      expect(service.currentUser).toBeNull();
    }));
  it('should return false when call canActive and currentUser is null',
    () => {

      // given
      spyOn(router, 'navigate').and.returnValue('');

      // when
      const result = service.canActivate();

      // then
      expect(router.navigate).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });
  it('should return true when call canActive and currentUser is true',
    () => {

      // given
      service.currentUser = mockedUser;
      // when
      const result = service.canActivate();

      // then
      expect(result).toBeTruthy();
    });
  it('should return true when call canShow and currentUser is true',
    () => {

      // given
      service.currentUser = mockedUser;
      // when
      const result = service.canShow();

      // then
      expect(result).toBeTruthy();
    });
  it('should return true when call canShow and currentUser is null',
    () => {

      // given

      // when
      const result = service.canShow();

      // then
      expect(result).toBeFalsy();
    });
  it('should remove currentUser and remove currentUser from sessionstorage',
    () => {

      // given
      service.currentUser = mockedUser;
      sessionStorage.setItem('currentUser', 'mockedUser');
      spyOn(router, 'navigate').and.returnValue('');
      // when
      service.logout();

      // then
      expect(router.navigate).toHaveBeenCalled();
      expect(service.currentUser).toBeFalsy();
      expect(sessionStorage.getItem('currentUser')).toBeFalsy();
    });




});
