import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routing';

import { HomeComponent } from './pages/home/home.component';
import { TopMenuComponent } from './shared/layouts/topmenu/topmenu.component';
import { CalendarComponent } from './shared/calendar/calendar.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TopMenuComponent,
        CalendarComponent
    ],
    bootstrap: [
        AppComponent
    ]   
})
export class AppModule {}