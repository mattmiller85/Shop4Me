import { SignoutComponent } from './components/routes/signout/signout.component';
import { SigninComponent } from './components/routes/signin/signin.component';
import { ShopComponent } from './components/routes/shop/shop.component';
import { HomeComponent } from './components/routes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'signin', component: SigninComponent },
   { path: 'signout', component: SignoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
