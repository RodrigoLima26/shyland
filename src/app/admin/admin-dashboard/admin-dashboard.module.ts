import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './admin-dashboard.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AdminLayoutModule} from '../../layouts/admin-layout/admin-layout.module';
import {AdminDashboardRoutingModule} from './admin-dashboard-routing.module';
import {RadarModule} from './graphs/radar/radar.module';
import {BarModule} from './graphs/bar/bar.module';


@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminLayoutModule,
        AdminDashboardRoutingModule,
        RadarModule,
        BarModule
    ]
})
export class AdminDashboardModule { }
