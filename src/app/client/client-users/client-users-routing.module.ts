import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClientUsersComponent} from './client-users.component';

const routes: Routes = [{ path: '', component: ClientUsersComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientUsersRoutingModule { }
