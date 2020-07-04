import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {TournamentRoutingModule} from './tournament-routing.module'


@NgModule({
  declarations: [TournamentListComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
