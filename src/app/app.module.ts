import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CommonModule } from "@angular/common";
import {CustomMaterialModule} from './custom-material/custom-material.module'


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


@NgModule({
  declarations: [
    AppComponent,
    //HomeComponent,
    //HeaderComponent,
    //FooterComponent,
    //IndexComponent
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
    SharedModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
