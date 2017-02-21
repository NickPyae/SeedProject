import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user.model';
import 'rxjs';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(public http: Http) { 
  }

  signup(user: User) {
  
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:4200/user/signup', user, { headers }).map((response: Response) => {
      const result = response.json();

      return result;
    }).catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

}
