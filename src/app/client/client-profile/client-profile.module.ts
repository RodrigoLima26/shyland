import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ClientProfileComponent} from './client-profile.component';
import {ClientLayoutModule} from '../../layouts/client-layout/client-layout.module';
import {ChartsModule} from 'ng2-charts';
import {ClientProfileRoutingModule} from './client-profile-routing.module';

@NgModule({
    declarations: [ClientProfileComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        ClientLayoutModule,
        ClientProfileRoutingModule,
        ChartsModule
    ]
})
export class ClientProfileModule { }
