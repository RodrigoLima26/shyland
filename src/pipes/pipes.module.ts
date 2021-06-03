import { NgModule } from '@angular/core';
import {FormatDatePipe} from './format-date/format-date.pipe';

@NgModule({
    declarations: [
        FormatDatePipe
    ],
    imports: [],
    exports: [
        FormatDatePipe
    ]
})
export class PipesModule { }
