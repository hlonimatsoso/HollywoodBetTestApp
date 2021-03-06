import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {SettingsService} from '../../settings/settings.service'
import {Tournament} from '../../models/Tournament'
import {Observable, of, throwError as observableThrowError, from} from 'rxjs';
import {map, tap,finalize,catchError } from 'rxjs/operators';
import {BaseServiceService} from '../../shared/services/base-service.service'
import { BehaviorSubject } from 'rxjs'; 
import {MessageBusService} from '../../shared/services/message-bus.service'

@Injectable({
  providedIn: 'root'
})
export class TournamentsService extends BaseServiceService {

// private _isBusy = new BehaviorSubject<boolean>(false);

// public isBusy$ = this._isBusy.asObservable();

  constructor(private _http:HttpClient, private _settings:SettingsService, private _messageBus:MessageBusService) { 
    super();
  }

  getTournaments(){
    
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

    return this._http.get<Tournament[]>(this._settings.tournamentsUrl, httpOptions)
               .pipe(
                  tap(x => {
                    console.log(`TournamentService.getTournaments().tap(): Got all tournaments & letting the world know -> ${JSON.stringify(x)}`);
                    this._messageBus.tournamentToolBar_getAllTournaments_sendUpdate(x);
                  }),
                  finalize (()=>{
                    this._messageBus.tournamentService_isBusy_sendUpdate(false);
                  })
                    //catchError( this.handleError())
                );
  }

  addTourn (t: Tournament): Observable<Tournament> {
    this._messageBus.tournamentService_isBusy_sendUpdate(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };
    console.log(`Hitting ${this._settings.tournamentsUrl}. with  ` + JSON.stringify(t));

    var result = this._http.post<Tournament>(this._settings.tournamentsUrl, t, httpOptions)
      .pipe(
        tap((x)=>{ console.log(`Tap Result : ` + x) }),
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  
  updateTournament (tournament: Tournament): Observable<Tournament> {
    this._messageBus.tournamentService_isBusy_sendUpdate(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };
    console.log(`Hitting ${this._settings.tournamentsUrl}. with PUT  ` + JSON.stringify(tournament));

    tournament.tournamentID = Number.parseInt(tournament.tournamentID.toString());
    var result = this._http.post<Tournament>(this._settings.tournamentsUrl, tournament, httpOptions)
      .pipe(
        tap((x)=>{ console.log(`Tap Result : ` + x) }),
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  deleteTournament(tournament:Tournament[]){
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    for (let i in tournament) {
      tournament[i].tournamentID = Number.parseInt(tournament[i].tournamentID.toString());
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

   var result = this._http.request('DELETE', this._settings.tournamentsUrl + '/Delete', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      }),
      body: tournament 
      }).pipe(
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
        })
      );

    

    return result;

  }

}
