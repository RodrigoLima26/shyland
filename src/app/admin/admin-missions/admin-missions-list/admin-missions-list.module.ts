import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {AdminLayoutModule} from '../../../layouts/admin-layout/admin-layout.module';
import {BrMaskerModule} from 'br-mask';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {AdminMissionsListComponent} from './admin-missions-list.component';
import {AdminMissionsListRoutingModule} from './admin-missions-list-routing.module';


@NgModule({
    declarations: [AdminMissionsListComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminMissionsListRoutingModule,
        FormsModule,
        AdminLayoutModule,
        BrMaskerModule,
        PaginationModule,
        PipesModule
    ]
})
export class AdminMissionsListModule { }
