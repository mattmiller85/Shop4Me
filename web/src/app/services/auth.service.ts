import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  username = '';

  constructor() {
    Auth.currentUserInfo().then(u => {
      this.isLoggedIn.next(u != null);
    })
    .catch(err => console.log(err));

    Auth.currentAuthenticatedUser().then(u => {
      this.username = u.getUsername();
    })
    .catch(err => console.log(err));
  }

  getUsername() {
    return this.username;
  }
}
