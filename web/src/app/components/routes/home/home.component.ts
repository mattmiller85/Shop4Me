import { CognitoUser } from 'amazon-cognito-identity-js';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: BehaviorSubject<boolean>;

  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
