import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Dish} from './dish';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  getUser(name: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`http://localhost:3000/users`, {
      params: {
        name: name
      }
    });
  }


  constructor(private readonly httpClient: HttpClient) {
  }
}
