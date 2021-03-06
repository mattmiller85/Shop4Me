import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SignoutComponent } from './components/routes/signout/signout.component';
import { SearchesComponent } from './routes/searches/searches.component';
import { AccountComponent } from './routes/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditSearchComponent } from './components/shared/edit-search/edit-search.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { FaqComponent } from './routes/faq/faq.component'; 

/* Angular Material -- Lazy and not do another module */
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'; 


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
    SignoutComponent,
    SearchesComponent,
    AccountComponent,
    EditSearchComponent,
    ConfirmDialogComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    AmplifyUIAngularModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
