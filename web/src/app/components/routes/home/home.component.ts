import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
