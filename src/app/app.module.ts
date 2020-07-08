import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CommonModule } from "@angular/common";
import {CustomMaterialModule} from './modules/custom-material/custom-material.module'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
//import { HomeComponent } from './shell/home/home.component';
//import { HeaderComponent } from './shell/header/header.component';
//import { FooterComponent } from './shell/footer/footer.component';
import {HomeModule} from './shell/home/home.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { EventModule } from './modules/event/event.module';
import {SettingsService} from './core/settings/settings.service'
import {CoreModule} from './core/core.module'
import {SharedModule} from './core/shared/shared.module'
import {AccountModule} from './core/account/account.module'
import {EventDetailModule} from './modules/event-detail/event-detail.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    TournamentModule,
    EventModule,
    CoreModule,
    SharedModule,
    AccountModule,
    EventDetailModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
