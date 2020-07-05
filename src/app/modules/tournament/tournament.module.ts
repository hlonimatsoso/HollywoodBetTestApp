import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {TournamentRoutingModule} from './tournament-routing.module'
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module';
import {SharedModule} from '../../core/shared/shared.module'

@NgModule({
  declarations: [TournamentListComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    CustomMaterialModule,
    SharedModule
  ]
})
export class TournamentModule { }
