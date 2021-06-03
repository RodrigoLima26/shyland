import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './font-pages/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import {BrMaskerModule} from 'br-mask';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecoverPasswordComponent } from './font-pages/recover-password/recover-password.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import {NgSimpleProgressBarModule} from 'ng-simple-progress-bar';
import { OAuthLoginComponent } from './font-pages/o-auth-login/o-auth-login.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {InterceptorModule} from '../module/interceptor.module';
import { MissionsComponent } from './components/missions/missions.component';
import { ClientMissionsComponent } from './client/client-missions/client-missions.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {PipesModule} from '../pipes/pipes.module';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import {ChartsModule} from 'ng2-charts';
import { ClientUsersComponent } from './client/client-users/client-users.component';
import { ClientNotificationsComponent } from './client/client-notifications/client-notifications.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        HomeComponent,
        RecoverPasswordComponent,
        ClientHomeComponent,
        ClientLayoutComponent,
        MissionsComponent,
        ClientMissionsComponent,
        PaginationComponent,
        ClientProfileComponent,
        OAuthLoginComponent,
        ClientUsersComponent,
        ClientNotificationsComponent
    ],
    imports: [
        InterceptorModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrMaskerModule,
        FontAwesomeModule,
        NgSimpleProgressBarModule,
        TooltipModule,
        PipesModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ChartsModule
    ],
    providers: [],
    exports: [
        HomeLayoutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
