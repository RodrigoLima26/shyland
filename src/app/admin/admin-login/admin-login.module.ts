import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AdminLoginRoutingModule} from './admin-login-routing.module';
import {AdminLoginComponent} from './admin-login.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [AdminLoginComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AdminLoginRoutingModule,
        FormsModule
    ]
})
export class AdminLoginModule { }
