import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {AdminLayoutModule} from '../../../layouts/admin-layout/admin-layout.module';
import {BrMaskerModule} from 'br-mask';
import {PaginationModule} from '../../../components/pagination/pagination.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {AdminMissionsFormComponent} from './admin-missions-form.component';
import {AdminMissionsFormRoutingModule} from './admin-missions-form-routing.module';


@NgModule({
    declarations: [AdminMissionsFormComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminMissionsFormRoutingModule,
        FormsModule,
        AdminLayoutModule,
        BrMaskerModule,
        PaginationModule,
        PipesModule
    ]
})
export class AdminMissionsFormModule { }
