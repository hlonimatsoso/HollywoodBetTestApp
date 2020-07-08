import { Injectable } from '@angular/core';
import {MessageBusService} from './message-bus.service'
import {Tournament} from '../../models/Tournament'

@Injectable({
  providedIn: 'root'
})
export class OhGreatOracleService {

  tournaments:Tournament[];

  constructor(private _messageBus:MessageBusService) { 

    console.log(`OhGreatOracle.constructor(): Let there be wisdom...`);
    this.tournaments = [];

    // Append each created tournament as it streams in
    this._messageBus.tournamentToolBox_newTournament$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().tournamentToolBox_newTournament$: Adding new tournament to list. ${JSON.stringify(value)}`);
      this.tournaments.push(value);
    });

    this._messageBus.tournamentToolBar_getAllTournaments$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().tournamentToolBar_getAllTournaments$: Replacing old list with new one. ${JSON.stringify(value)}`);
      this.tournaments = [];
      this.tournaments = value;
    });
  }


}
