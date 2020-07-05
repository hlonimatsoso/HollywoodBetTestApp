import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Tournament} from '../../models/Tournament'

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  private tournamentToolBox_isEditEnabled = new Subject<boolean>();
  private tournamentToolBox_newTournament = new Subject<Tournament>();


  constructor() { }

  public tournamentToolBox_isEditEnabled_sendUpdate(isEnabled:boolean) {
    this.tournamentToolBox_isEditEnabled.next(isEnabled);
  }

  public tournamentToolBox_newTournament_sendUpdate(tournament:Tournament) {
    this.tournamentToolBox_newTournament.next(tournament);
  }

  get tournamentToolBox_isEditEnabled$(): Observable<boolean> {
    return this.tournamentToolBox_isEditEnabled.asObservable();
  }

  get tournamentToolBox_newTournament$(): Observable<Tournament> {
    return this.tournamentToolBox_newTournament.asObservable();
  }

  // clearMessage() {
  //     this.tournamentToolBox_isEditEnabled.next();
  // }


}
