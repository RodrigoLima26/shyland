import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMissionsListComponent } from './admin-missions-list.component';

const routes: Routes = [{ path: '', component: AdminMissionsListComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMissionsListRoutingModule { }
