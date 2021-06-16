import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HasApiTokenGuard} from '../guards/has-api-token/has-api-token.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./client-home/client-home.module').then(m => m.ClientHomeModule),
        canActivate:[HasApiTokenGuard]
    },
    {
        path: 'missoes',
        loadChildren: () => import('./client-missions/client-missions.module').then(m => m.ClientMissionsModule),
        canActivate:[HasApiTokenGuard]
    },
    {
        path: 'perfil',
        loadChildren: () => import('./client-profile/client-profile.module').then(m => m.ClientProfileModule),
        canActivate:[HasApiTokenGuard]
    },
    {
        path: 'perfil/:id',
        loadChildren: () => import('./client-profile/client-profile.module').then(m => m.ClientProfileModule),
        canActivate:[HasApiTokenGuard]
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./client-users/client-users.module').then(m => m.ClientUsersModule),
        canActivate:[HasApiTokenGuard]
    },
    {
        path: 'notificacoes',
        loadChildren: () => import('./client-notifications/client-notifications.module').then(m => m.ClientNotificationsModule),
        canActivate:[HasApiTokenGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
