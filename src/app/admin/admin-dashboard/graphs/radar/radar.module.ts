import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartsModule} from 'ng2-charts';
import {RadarComponent} from './radar.component';


@NgModule({
    declarations: [RadarComponent],
    exports: [
        RadarComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ChartsModule
    ]
})
export class RadarModule { }
