import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersListComponent } from './admin-users-list.component';

const routes: Routes = [{ path: '', component: AdminUsersListComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUsersListRoutingModule { }
