import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module'


@NgModule({
  declarations: [],
  imports: [
    //CommonModule,
    NgxSpinnerModule,
    CustomMaterialModule
  ],
  exports:[
    NgxSpinnerModule
  ]
})
export class SharedModule { }
