import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import {EventRoutingModule} from './event-routing.module';
import { EventToolBarComponent } from './event-tool-bar/event-tool-bar.component';
import { EventCardComponent } from './event-card/event-card.component'
import {EventListComponent} from './event-list/event-list.component'
import {CustomMaterialModule} from '../custom-material/custom-material.module'


@NgModule({
  declarations: [EventToolBarComponent, EventCardComponent,EventListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
