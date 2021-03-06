import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './font-pages/home/home.component';
import {RecoverPasswordComponent} from './font-pages/recover-password/recover-password.component';
import {ClientHomeComponent} from './client/client-home/client-home.component';
import {OAuthLoginComponent} from './font-pages/o-auth-login/o-auth-login.component';
import {HasApiTokenGuard} from './guards/has-api-token/has-api-token.guard';

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: 'recuperar-senha/:token', component: RecoverPasswordComponent },
    {path: 'oauth/login/:api_token', component: OAuthLoginComponent},
    // Clients Routes
    {path: 'cliente', component: ClientHomeComponent, canActivate:[HasApiTokenGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
