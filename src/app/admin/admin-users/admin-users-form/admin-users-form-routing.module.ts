import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersFormComponent } from './admin-users-form.component';

const routes: Routes = [{ path: '', component: AdminUsersFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUsersFormRoutingModule { }
