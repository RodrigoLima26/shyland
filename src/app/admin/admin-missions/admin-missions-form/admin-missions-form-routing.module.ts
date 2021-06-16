import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMissionsFormComponent } from './admin-missions-form.component';

const routes: Routes = [{ path: '', component: AdminMissionsFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMissionsFormRoutingModule { }
