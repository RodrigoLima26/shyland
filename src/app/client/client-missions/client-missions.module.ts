import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ClientMissionsComponent} from './client-missions.component';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ClientLayoutModule} from '../../layouts/client-layout/client-layout.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {ClientMissionsRoutingModule} from './client-missions-routing.module';


@NgModule({
    declarations: [ClientMissionsComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        PaginationModule,
        ClientMissionsRoutingModule,
        ClientLayoutModule,
        PipesModule
    ]
})
export class ClientMissionsModule { }
