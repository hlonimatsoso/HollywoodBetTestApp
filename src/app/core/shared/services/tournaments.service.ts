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
  //   let body = {
  //     tournaments:tournament
  // };
  
  // let options = new RequestOptionsArgs({ 
  //     body: body,
  //     method: RequestMethod.Delete
  //   });
  
  // this.http.request('http://testAPI:3000/stuff', options)
  //     .subscribe((ok)=>{console.log(ok)});


    // console.log(`Posting a delete to ${this._settings.tournamentsUrl}`);
    // return this._http.delete<Tournament[]>(this._settings.tournamentsUrl, tournamen,,httpOptions)
    //            .pipe(
    //               tap(x => console.log(`Tournament Service: Post Tournament -> ${JSON.stringify(x)}`)),
    //               finalize (()=>{
    //                 this._messageBus.tournamentService_isBusy_sendUpdate(false);
    //               })
    //                 //catchError( this.handleError())
    //             );
  }

}
