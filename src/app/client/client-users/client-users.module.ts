import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ClientUsersComponent} from './client-users.component';
import {ClientLayoutModule} from '../../layouts/client-layout/client-layout.module';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ClientUsersRoutingModule} from './client-users-routing.module';

@NgModule({
    declarations: [ClientUsersComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        ClientLayoutModule,
        ClientUsersRoutingModule,
        PaginationModule
    ]
})
export class ClientUsersModule { }
