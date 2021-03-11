import { CognitoUserInterface, AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  isLoggedIn: BehaviorSubject<boolean>;
  user: CognitoUserInterface | undefined;
  authState: AuthState | undefined;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef,
              private router: Router) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      const isLoggedIn = authState === AuthState.SignedIn;
      this.authService.isLoggedIn.next(isLoggedIn);
      if (isLoggedIn) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy(): any {
    return onAuthUIStateChange;
  }

}
