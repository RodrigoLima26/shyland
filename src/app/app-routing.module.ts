import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './font-pages/home/home.component';
import {RecoverPasswordComponent} from './font-pages/recover-password/recover-password.component';
import {ClientHomeComponent} from './client/client-home/client-home.component';
import {OAuthLoginComponent} from './font-pages/o-auth-login/o-auth-login.component';
import {HasApiTokenGuard} from './guards/has-api-token/has-api-token.guard';
import {ClientMissionsComponent} from './client/client-missions/client-missions.component';
import {ClientProfileComponent} from './client/client-profile/client-profile.component';
import {ClientUsersComponent} from './client/client-users/client-users.component';
import {ClientNotificationsComponent} from './client/client-notifications/client-notifications.component';
import {HasApiLoginGuard} from './guards/has-api-login/has-api-login.guard';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {IsAdminGuard} from './guards/is-admin/is-admin.guard';

const routes: Routes = [
    {path: "", component: HomeComponent, canActivate:[HasApiLoginGuard]},
    {path: 'recuperar-senha/:token', component: RecoverPasswordComponent, canActivate:[HasApiLoginGuard]},
    {path: 'oauth/login/:api_token', component: OAuthLoginComponent},
    // player Routes
    {path: 'jogador', component: ClientHomeComponent, canActivate:[HasApiTokenGuard] },
    {path: 'jogador/missoes', component: ClientMissionsComponent, canActivate:[HasApiTokenGuard] },
    {path: 'jogador/perfil', component: ClientProfileComponent, canActivate:[HasApiTokenGuard] },
    {path: 'jogador/perfil/:id', component: ClientProfileComponent, canActivate:[HasApiTokenGuard] },
    {path: 'jogador/usuarios', component: ClientUsersComponent, canActivate:[HasApiTokenGuard] },
    {path: 'jogador/notificacoes', component: ClientNotificationsComponent, canActivate:[HasApiTokenGuard] },
    // Admin Routes
    {path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
