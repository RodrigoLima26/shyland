import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientNotificationsComponent} from './client-notifications.component';

const routes: Routes = [{ path: '', component: ClientNotificationsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientNotificationsRoutingModule { }
