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
  whoIsUser: String;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;
    this.whoIsUser = authService.getUsername();
  }

  ngOnInit(): void {
  }

}
