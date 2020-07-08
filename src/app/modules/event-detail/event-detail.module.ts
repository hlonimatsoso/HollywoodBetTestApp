import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailListComponent } from './event-detail-list/event-detail-list.component';
import { EventDetailCardComponent } from './event-detail-card/event-detail-card.component';
import { EventDetailToolBarComponent } from './event-detail-tool-bar/event-detail-tool-bar.component';
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import {EventRoutingModule} from './event-detail-routing.module';
import { EventDetailStatusComponent } from './event-detail-status/event-detail-status.component'


@NgModule({
  declarations: [EventDetailListComponent, EventDetailCardComponent, EventDetailToolBarComponent, EventDetailStatusComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class EventDetailModule { }
