import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from '@angular/forms';
import {BrMaskerModule} from 'br-mask';
import {ChartsModule} from 'ng2-charts';
import {AdminProfileComponent} from './admin-profile.component';
import {AdminProfileRoutingModule} from './admin-profile-routing.module';
import {AdminLayoutModule} from '../../layouts/admin-layout/admin-layout.module';


@NgModule({
    declarations: [AdminProfileComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        BrMaskerModule,
        AdminLayoutModule,
        AdminProfileRoutingModule,
        ChartsModule
    ]
})
export class AdminProfileModule { }
