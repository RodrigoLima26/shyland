import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {AdminNotificationsRoutingModule} from './admin-notifications-routing.module';
import {AdminLayoutModule} from '../../layouts/admin-layout/admin-layout.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {AdminNotificationsComponent} from './admin-notifications.component';


@NgModule({
    declarations: [AdminNotificationsComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminNotificationsRoutingModule,
        FormsModule,
        AdminLayoutModule,
        BrMaskerModule,
        PaginationModule,
        PipesModule
    ]
})
export class AdminNotificationsModule { }
