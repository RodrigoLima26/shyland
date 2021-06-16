import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {MissionsComponent} from './missions.component';


@NgModule({
    declarations: [MissionsComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        MissionsComponent
    ]
})
export class MissionsModule { }
