import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Tournament} from '../../models/Tournament'
import {EditingOptions} from '../../models/EditingOption'
import { TournamentsService } from './tournaments.service';
import { RaceEvent } from '../../models/RaceEvent';
import { EventService } from './event.service';


@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  
  // Observable sources
  private tournamentToolBox_isEditEnabled = new Subject<boolean>();
  private tournamentToolBox_newTournament = new Subject<Tournament>();
  private _tournamentToolBar_getAllTournaments = new Subject<Tournament[]>();
  private _tournamentToolBar_updatedTournament = new Subject<Tournament>();
  private _tournamentCard_deleteTournament = new Subject<Tournament>();
  private _tournamentToolBar_deleteTournamentList = new Subject<Tournament[]>();
  private _tournamentService_isBusy = new Subject<boolean>();
  private _tournamentToolBar_activeEditingOption = new Subject<string>();
  private _tournamentToolBar_activeEditingTournament = new Subject<Tournament>();

  private _eventToolBar_isEditEnabled = new Subject<boolean>();
  private _eventToolBar_newEvent = new Subject<RaceEvent>();
  private _eventToolBar_updatedEvent = new Subject<RaceEvent>();
  private _eventCard_deleteEvent = new Subject<RaceEvent>();
  private _eventToolBar_deleteEventList = new Subject<RaceEvent[]>();
  private _eventService_isBusy = new Subject<boolean>();
  private _eventToolBar_activeEditingOption = new Subject<string>();
  private _eventToolBar_activeEditingEvent = new Subject<RaceEvent>();


  // Observable streams
  // Events

  get eventToolBar_isEditEnabled$(): Observable<boolean> {
    return this._eventToolBar_isEditEnabled.asObservable();
  }

  get eventToolBar_newEvent$(): Observable<RaceEvent> {
    return this._eventToolBar_newEvent.asObservable();
  }

  get eventToolBar_updatedEvent$(): Observable<RaceEvent> {
    return this._eventToolBar_updatedEvent.asObservable();
  }

  get eventService_isBusy$(): Observable<boolean> {
    return this._eventService_isBusy.asObservable();
  }

  get eventToolBar_activeEditingOption$(): Observable<string> {
    return this._eventToolBar_activeEditingOption.asObservable();
  }

  get eventToolBar_activeEditingEvent$(): Observable<RaceEvent> {
    return this._eventToolBar_activeEditingEvent.asObservable();
  }

  get eventCard_deleteEvent$(): Observable<RaceEvent> {
    return this._eventCard_deleteEvent.asObservable();
  }

  get eventToolBar_deleteEventList$(): Observable<RaceEvent[]> {
    return this._eventToolBar_deleteEventList.asObservable();
  }


  // Tournament
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

  get tournamentCard_deleteTournament$(): Observable<Tournament> {
    return this._tournamentCard_deleteTournament.asObservable();
  }

  get tournamentToolBar_deleteTournamentList$(): Observable<Tournament[]> {
    return this._tournamentToolBar_deleteTournamentList.asObservable();
  }

  get tournamentToolBar_getAllTournaments$(): Observable<Tournament[]> {
    return this._tournamentToolBar_getAllTournaments.asObservable();
  }

  constructor() { }

  // Utility funstions for 'subjects' whom wish to emit updates
  // Tournaments
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

  public tournamentCard_deleteTournament_sendUpdate(tournament:Tournament) {
    this._tournamentCard_deleteTournament.next(tournament);
  }

  public tournamentToolBar_deleteTournamentList_sendUpdate(tournament:Tournament[]) {
    this._tournamentToolBar_deleteTournamentList.next(tournament);
  }
  
  public tournamentToolBar_getAllTournaments_sendUpdate(tournaments:Tournament[]) {
    this._tournamentToolBar_getAllTournaments.next(tournaments);
  }
  
  // Events
   
  public eventToolBar_isEditEnabled_sendUpdate(isEnabled:boolean) {
    this._eventToolBar_isEditEnabled.next(isEnabled);
  }

  public eventToolBar_newEvent_sendUpdate(event:RaceEvent) {
    this._eventToolBar_newEvent.next(event);
  }

  public eventToolBar_updatedEvent_sendUpdate(event:RaceEvent) {
    this._eventToolBar_updatedEvent.next(event);
  }

  public eventService_isBusy_sendUpdate(isBusy:boolean) {
    this._eventService_isBusy.next(isBusy);
  }

  public eventToolBar_activeEditingOption_sendUpdate(option:string) {
    this._eventToolBar_activeEditingOption.next(option);
  }

  public eventToolBar_activeEditingEvent_sendUpdate(event:RaceEvent) {
    this._eventToolBar_activeEditingEvent.next(event);
  }

  public eventCard_deleteEvent_sendUpdate(event:RaceEvent) {
    this._eventCard_deleteEvent.next(event);
  }

  public eventToolBar_deleteEventList_sendUpdate(event:RaceEvent[]) {
    this._eventToolBar_deleteEventList.next(event);
  }

  clearMessage(subject:Subject<any>) {
      subject.next();
  }

}
