import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Tournament} from '../../models/Tournament'

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  
  private tournamentToolBox_isEditEnabled = new Subject<boolean>();
  private tournamentToolBox_newTournament = new Subject<Tournament>();
  private _tournamentService_isBusy = new Subject<boolean>();

  get tournamentToolBox_isEditEnabled$(): Observable<boolean> {
    return this.tournamentToolBox_isEditEnabled.asObservable();
  }

  get tournamentToolBox_newTournament$(): Observable<Tournament> {
    return this.tournamentToolBox_newTournament.asObservable();
  }

  get tournamentService_isBusy$(): Observable<boolean> {
    return this._tournamentService_isBusy.asObservable();
  }

  constructor() { }

  public tournamentToolBox_isEditEnabled_sendUpdate(isEnabled:boolean) {
    this.tournamentToolBox_isEditEnabled.next(isEnabled);
  }

  public tournamentToolBox_newTournament_sendUpdate(tournament:Tournament) {
    this.tournamentToolBox_newTournament.next(tournament);
  }

  public tournamentService_isBusy_sendUpdate(isBusy:boolean) {
    this._tournamentService_isBusy.next(isBusy);
  }

  clearMessage(subject:Subject<any>) {
      subject.next();
  }

}
