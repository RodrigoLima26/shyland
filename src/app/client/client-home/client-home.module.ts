import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ClientHomeComponent} from './client-home.component';
import {ClientLayoutModule} from '../../layouts/client-layout/client-layout.module';
import {MissionsModule} from '../../components/missions/missions.module';
import {ClientHomeRoutingModule} from './client-home-routing.module';


@NgModule({
    declarations: [ClientHomeComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        ClientHomeRoutingModule,
        ClientLayoutModule,
        MissionsModule
    ]
})
export class ClientHomeModule { }
