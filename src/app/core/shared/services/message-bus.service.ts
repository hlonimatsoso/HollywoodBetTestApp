import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Tournament} from '../../models/Tournament'
import {EditingOptions} from '../../models/EditingOption'
import { TournamentsService } from './tournaments.service';


@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  
  // Observable sources
  private tournamentToolBox_isEditEnabled = new Subject<boolean>();
  private tournamentToolBox_newTournament = new Subject<Tournament>();
  private _tournamentToolBar_updatedTournament = new Subject<Tournament>();

  private _tournamentService_isBusy = new Subject<boolean>();
  private _tournamentToolBar_activeEditingOption = new Subject<string>();
  private _tournamentToolBar_activeEditingTournament = new Subject<Tournament>();

  // Observable streams
  get tournamentToolBox_isEditEnabled$(): Observable<boolean> {
    return this.tournamentToolBox_isEditEnabled.asObservable();
  }

  get tournamentToolBox_newTournament$(): Observable<Tournament> {
    return this.tournamentToolBox_newTournament.asObservable();
  }

  get tournamentToolBar_updatedTournament$(): Observable<Tournament> {
    return this._tournamentToolBar_updatedTournament.asObservable();
  }

  get tournamentService_isBusy$(): Observable<boolean> {
    return this._tournamentService_isBusy.asObservable();
  }

  get tournamentToolBar_activeEditingOption$(): Observable<string> {
    return this._tournamentToolBar_activeEditingOption.asObservable();
  }

  get tournamentToolBar_activeEditingTournament$(): Observable<Tournament> {
    return this._tournamentToolBar_activeEditingTournament.asObservable();
  }

  constructor() { }

  // Utility funstions for 'subjects' whom wish to emit updates
  public tournamentToolBox_isEditEnabled_sendUpdate(isEnabled:boolean) {
    this.tournamentToolBox_isEditEnabled.next(isEnabled);
  }

  public tournamentToolBox_newTournament_sendUpdate(tournament:Tournament) {
    this.tournamentToolBox_newTournament.next(tournament);
  }

  public tournamentToolBar_updatededTournament_sendUpdate(tournament:Tournament) {
    this._tournamentToolBar_updatedTournament.next(tournament);
  }

  public tournamentService_isBusy_sendUpdate(isBusy:boolean) {
    this._tournamentService_isBusy.next(isBusy);
  }

  public tournamentToolBar_activeEditingOption_sendUpdate(option:string) {
    this._tournamentToolBar_activeEditingOption.next(option);
  }

  public tournamentToolBar_activeEditingTournament_sendUpdate(tournament:Tournament) {
    this._tournamentToolBar_activeEditingTournament.next(tournament);
  }

  clearMessage(subject:Subject<any>) {
      subject.next();
  }

}
