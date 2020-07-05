import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {TournamentRoutingModule} from './tournament-routing.module'
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module';
import {SharedModule} from '../../core/shared/shared.module'
import {TournamentCardComponent} from '../tournament/tournament-card/tournament-card.component';
import { TournamentToolBarComponent } from './tournament-tool-bar/tournament-tool-bar.component'

@NgModule({
  declarations: [TournamentListComponent,TournamentCardComponent, TournamentToolBarComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    CustomMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class TournamentModule { }
