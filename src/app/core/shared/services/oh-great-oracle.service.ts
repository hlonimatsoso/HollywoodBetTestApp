import { Injectable } from '@angular/core';
import {MessageBusService} from './message-bus.service'
import {Tournament} from '../../models/Tournament'
import {RaceEvent} from '../../models/RaceEvent'


@Injectable({
  providedIn: 'root'
})
export class OhGreatOracleService {

  /*
    The Oracle listens to any one, and keeps track of all changes for later retrieval by other components needing instant access to data fly around but wasn't lisening/subscribing. 
  */

  tournaments:Tournament[];
  events:RaceEvent[];

  constructor(private _messageBus:MessageBusService) { 

    console.log(`OhGreatOracle.constructor(): Let there be wisdom...`);
    this.tournaments = [];
    this.events = [];

    // Keep track of tounaments
    this._messageBus.tournamentToolBox_newTournament$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().tournamentToolBox_newTournament$: Adding new tournament to list. ${JSON.stringify(value)}`);
      this.tournaments.push(value);
    });

    this._messageBus.tournamentToolBar_getAllTournaments$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().tournamentToolBar_getAllTournaments$: Replacing old list with new one. ${JSON.stringify(value)}`);
      this.tournaments = [];
      this.tournaments = value;
    });

    // Keep track of events
    this._messageBus.eventToolBar_newEvent$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().eventToolBar_newEvent$: Adding new event to list. ${JSON.stringify(value)}`);
      this.events.push(value);
    });

    this._messageBus.eventToolBar_getAllEvents$.subscribe(value =>{
      console.log(`OhGreatOracle.constructor().eventToolBar_getAllEvents$: Replacing old list with new one. ${JSON.stringify(value)}`);
      this.events = [];
      this.events = value;
    });

  }


}
