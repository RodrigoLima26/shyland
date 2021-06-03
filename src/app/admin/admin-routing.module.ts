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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
