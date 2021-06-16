import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminLayoutComponent} from "./admin-layout.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule
    ],
  exports: [
    AdminLayoutComponent
  ],
  declarations: [
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule {}
