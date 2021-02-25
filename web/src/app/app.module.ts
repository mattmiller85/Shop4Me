import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* import AmplifyUIAngularModule  */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { HomeComponent } from './components/routes/home/home.component';
import { ShopComponent } from './components/routes/shop/shop.component';

import Amplify from 'aws-amplify';
import getconfig from './config';
import { SigninComponent } from './components/routes/signin/signin.component';
import { SearchComponent } from './components/search/search.component';
import { SignoutComponent }  from './components/routes/signout/signout.component';

const config = getconfig();



Amplify.configure({
  Auth: {
    region: config.cognito.userPoolRegion,
    userPoolId: config.cognito.userPoolId,
    userPoolWebClientId: config.cognito.userPoolWebClientId,
    identityPoolId: undefined
  },
  API: {
    endpoints: config.apis,
  },
  Analytics: {
    disabled: true,
  },
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    SigninComponent,
    SearchComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
