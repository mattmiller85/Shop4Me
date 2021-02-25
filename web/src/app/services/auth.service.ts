import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);

  constructor() {
    Auth.currentUserInfo().then(u => this.isLoggedIn.next(u != null))
  }
}
