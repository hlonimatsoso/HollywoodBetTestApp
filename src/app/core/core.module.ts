import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuardService} from './auth/auth-guard.service'
import {AuthServiceService} from './auth/auth-service.service'
import {SettingsService} from './settings/settings.service'
import { HttpClientModule } from '@angular/common/http';
import {TournamentsService} from './shared/services/tournaments.service'
import {MessageBusService} from '../core/shared/services/message-bus.service';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component'
import {OhGreatOracleService} from '../core/shared/services/oh-great-oracle.service';
import {EventDetailMessageBusService} from '../core/shared/services/event-detail-message-bus.service';



@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    AuthServiceService,
    AuthGuardService,
    TournamentsService,
    MessageBusService,
    OhGreatOracleService,
    EventDetailMessageBusService
  ]
})
export class CoreModule { }
