import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {SettingsService} from '../../settings/settings.service'
import {Tournament} from '../../models/Tournament'
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {map, tap,finalize } from 'rxjs/operators';
import {BaseServiceService} from '../../shared/services/base-service.service'
import { BehaviorSubject } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class TournamentsService extends BaseServiceService {

private _isBusy = new BehaviorSubject<boolean>(false);

public isBusy$ = this._isBusy.asObservable();

  constructor(private _http:HttpClient, private _settings:SettingsService) { 
    super();
  }

  getTournaments(){
    this._isBusy.next(true);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

    return this._http.get<Tournament[]>(this._settings.tournaments, httpOptions)
               .pipe(
                 map(x => JSON.stringify(x)),
                  tap(x => console.log(`fetched tournaments : ${x}`)),//,
                    finalize (()=>{
                      this._isBusy.next(false);
                    })
                    //catchError( this.handleError('getHeroes', []))
                  );
  }

}
