import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { APP_ROUTING } from './app.routing';

import { HomeComponent } from './pages/home/home.component';
import { TopMenuComponent } from './shared/layouts/topmenu/topmenu.component';
import { CalendarComponent } from './shared/calendar/calendar.component';

import { ApiInterceptors } from './core/api-client/api-interceptors';
import { JobsService } from './shared/jobs/jobs-service';
import { PetersenPaintingResource } from './core/api-client/petersenpainting-resources';
import { ConfigService } from './core/config/config-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING,
        MomentModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TopMenuComponent,
        CalendarComponent
    ],
    providers: [
        ConfigService,
        ApiInterceptors,
        PetersenPaintingResource,
        JobsService
    ],
    bootstrap: [
        AppComponent
    ]   
})
export class AppModule {}