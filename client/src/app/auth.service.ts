import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user.model';
import 'rxjs';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(public http: Http) {
  }

  localhost = 'http://localhost:4200';
  TOKEN_KEY = 'AWESOME_TOKEN_KEY';

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(`${this.localhost}/user/signup`, body, { headers }).map((response: Response) => {
      const result = response.json();

      return result;
    }).catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  authenticate(user: User) {
    const body = JSON.stringify({ userName: user.userName, password: user.password });
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.localhost}/user/authenticate`, body, { headers }).map((response: Response) => {
      const result = response.json();

      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(result));

      return result;
    }).catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.localhost}/user/delete/` + userId).map((response: Response) => {
      const result = response.json();

      return result;
    }).catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  isAuthorized() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const obj = JSON.parse(localStorage.getItem(this.TOKEN_KEY));

    headers.append('Authorization', obj.token);

    return this.http.get(`${this.localhost}/user/dashboard`, { headers }).map((response: Response) => {
      const result = response.json();

      return result;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }
}
