import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ClientNotificationsComponent} from './client-notifications.component';
import {ClientLayoutModule} from '../../layouts/client-layout/client-layout.module';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../../pipes/pipes.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ClientNotificationsRoutingModule} from './client-notifications-routing.module';


@NgModule({
    declarations: [ClientNotificationsComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        ClientLayoutModule,
        ClientNotificationsRoutingModule,
        RouterModule,
        PipesModule,
        PaginationModule
    ]
})
export class ClientNotificationsModule { }
