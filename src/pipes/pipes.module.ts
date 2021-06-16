import { NgModule } from '@angular/core';
import {FormatDatePipe} from './format-date/format-date.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        FormatDatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormatDatePipe
    ]
})
export class PipesModule { }
