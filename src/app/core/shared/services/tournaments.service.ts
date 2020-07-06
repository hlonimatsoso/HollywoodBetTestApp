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
                  tap(x => console.log(`Tournament Service: Get All -> ${JSON.stringify(x)}`)),
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
        catchError(this.handleError)
      );

      return result;
  }

  addTournament(tournament:Tournament){
    
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

    console.log(`Posting to ${this._settings.tournamentsUrl}`);
    return this._http.post<Tournament>(this._settings.tournamentsUrl, JSON.stringify(tournament),httpOptions)
               .pipe(
                  tap(x => console.log(`Tournament Service: Post Tournament -> ${JSON.stringify(x)}`)),
                  finalize (()=>{
                    this._messageBus.tournamentService_isBusy_sendUpdate(false);
                  })
                    //catchError( this.handleError())
                );
  }

}
