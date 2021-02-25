import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop4me';
  isLoggedIn: BehaviorSubject<boolean>;
  user: CognitoUserInterface | undefined;
  authState: AuthState | undefined;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef,
              private router: Router) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit() {
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

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
