import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsAdminGuard} from '../guards/is-admin/is-admin.guard';
import {HasApiLoginGuard} from '../guards/has-api-login/has-api-login.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdminLoginModule),
        canActivate:[HasApiLoginGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./admin-users/admin-users-list/admin-users-list.module').then(m => m.AdminUsersListModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'usuarios/cadastro/:id',
        loadChildren: () => import('./admin-users/admin-users-form/admin-users-form.module').then(m => m.AdminUsersFormModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'missoes',
        loadChildren: () => import('./admin-missions/admin-missions-list/admin-missions-list.module').then(m => m.AdminMissionsListModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'missoes/cadastro',
        loadChildren: () => import('./admin-missions/admin-missions-form/admin-missions-form.module').then(m => m.AdminMissionsFormModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'missoes/cadastro/:id',
        loadChildren: () => import('./admin-missions/admin-missions-form/admin-missions-form.module').then(m => m.AdminMissionsFormModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'notificacoes',
        loadChildren: () => import('./admin-notifications/admin-notifications.module').then(m => m.AdminNotificationsModule),
        canActivate:[IsAdminGuard]
    },
    {
        path: 'perfil',
        loadChildren: () => import('./admin-profile/admin-profile.module').then(m => m.AdminProfileModule),
        canActivate:[IsAdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
