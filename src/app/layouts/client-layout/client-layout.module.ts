import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {ClientLayoutComponent} from './client-layout.component';
import {NgSimpleProgressBarModule} from 'ng-simple-progress-bar';
import {TooltipModule} from 'ng2-tooltip-directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule,
        NgSimpleProgressBarModule,
        TooltipModule
    ],
    exports: [
        ClientLayoutComponent
    ],
    declarations: [
        ClientLayoutComponent
    ]
})

export class ClientLayoutModule {}
