import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClientMissionsComponent} from './client-missions.component';

const routes: Routes = [{ path: '', component: ClientMissionsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientMissionsRoutingModule { }
