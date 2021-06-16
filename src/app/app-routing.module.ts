import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './font-pages/home/home.component';
import {RecoverPasswordComponent} from './font-pages/recover-password/recover-password.component';
import {OAuthLoginComponent} from './font-pages/o-auth-login/o-auth-login.component';
import {HasApiLoginGuard} from './guards/has-api-login/has-api-login.guard';

const routes: Routes = [
    {path: "", component: HomeComponent, canActivate:[HasApiLoginGuard]},
    {path: 'recuperar-senha/:token', component: RecoverPasswordComponent, canActivate:[HasApiLoginGuard]},
    {path: 'oauth/login/:api_token', component: OAuthLoginComponent},
    // Player Routes
    {path:'jogador', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
    // Admin Routes
    {path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
