import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  user = new Subject<{ username: string, attributes: { email: string, name: string}}>();

  constructor() {
    Auth.currentUserInfo().then(u => {
      this.isLoggedIn.next(u != null);
      this.user.next(u);
    });
  }
}
