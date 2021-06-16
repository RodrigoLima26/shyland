import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AdminUsersListRoutingModule} from './admin-users-list-routing.module';
import {AdminUsersListComponent} from './admin-users-list.component';
import {FormsModule} from '@angular/forms';
import {AdminLayoutModule} from '../../../layouts/admin-layout/admin-layout.module';
import {BrMaskerModule} from 'br-mask';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
    declarations: [AdminUsersListComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminUsersListRoutingModule,
        FormsModule,
        AdminLayoutModule,
        BrMaskerModule,
        PaginationModule,
        PipesModule
    ]
})
export class AdminUsersListModule { }
