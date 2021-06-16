import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AdminUsersFormRoutingModule} from './admin-users-form-routing.module';
import {AdminUsersFormComponent} from './admin-users-form.component';
import {FormsModule} from '@angular/forms';
import {AdminLayoutModule} from '../../../layouts/admin-layout/admin-layout.module';
import {BrMaskerModule} from 'br-mask';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
    declarations: [AdminUsersFormComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminUsersFormRoutingModule,
        FormsModule,
        AdminLayoutModule,
        BrMaskerModule,
        PaginationModule,
        PipesModule
    ]
})
export class AdminUsersFormModule { }
