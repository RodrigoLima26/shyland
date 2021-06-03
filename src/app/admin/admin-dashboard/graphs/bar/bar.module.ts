import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartsModule} from 'ng2-charts';
import {BarComponent} from './bar.component';


@NgModule({
    declarations: [BarComponent],
    exports: [
        BarComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ChartsModule
    ]
})
export class BarModule { }
