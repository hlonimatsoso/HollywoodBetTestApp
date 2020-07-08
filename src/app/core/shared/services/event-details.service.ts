import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {SettingsService} from '../../settings/settings.service'
import {EventDetail} from '../../models/EventDetail'
import {Observable, of, throwError as observableThrowError, from} from 'rxjs';
import {map, tap,finalize,catchError } from 'rxjs/operators';
import {BaseServiceService} from '../../shared/services/base-service.service'
import { BehaviorSubject } from 'rxjs'; 
import {MessageBusService} from '../../shared/services/message-bus.service'
import {EventDetailMessageBusService} from '../../shared/services/event-detail-message-bus.service'


@Injectable({
  providedIn: 'root'
})
export class EventDetailsService extends BaseServiceService {

  constructor(private _http:HttpClient, 
              private _settings:SettingsService, 
              private _messageBus:MessageBusService, 
              private _eventDetailMessageBus:EventDetailMessageBusService) { 
    super();
  }

  getAllEventDetails(){
    
    this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(true);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

    return this._http.get<EventDetail[]>(this._settings.eventDetailUrl, httpOptions)
               .pipe(
                  tap(x => {
                    console.log(`EventDetailService.getEventDetails().tap(): Got all event details & letting everyone know -> ${JSON.stringify(x)}`);
                    this._eventDetailMessageBus.eventDetail_ToolBar_getAllEventDetails_sendUpdate(x);
                  }),
                  finalize (()=>{
                    this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(false);
                  })
                    //catchError( this.handleError())
                );
  }

  addEventDetail (t: EventDetail): Observable<EventDetail> {
    this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };
    console.log(`Hitting ${this._settings.eventDetailUrl}. with  ` + JSON.stringify(t));

    var result = this._http.post<EventDetail>(this._settings.eventDetailUrl, t, httpOptions)
      .pipe(
        tap((x)=>{ console.log(`Tap Result : ` + x) }),
        finalize(()=>{
          this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(false);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  
  updateEventDetail (eventDetail: EventDetail): Observable<EventDetail> {
    this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };
    console.log(`Hitting ${this._settings.eventDetailUrl}. with PUT  ` + JSON.stringify(eventDetail));

    eventDetail.eventDetailID = Number.parseInt(eventDetail.eventDetailID.toString());
    var result = this._http.post<EventDetail>(this._settings.eventDetailUrl, eventDetail, httpOptions)
      .pipe(
        tap((x)=>{ console.log(`Tap Result : ` + x) }),
        finalize(()=>{
          this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(false);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  deleteEventDetail(eventDetail:EventDetail[]){
    this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(true);

    for (let i in eventDetail) {
      eventDetail[i].eventDetailID = Number.parseInt(eventDetail[i].eventDetailID.toString());
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      })
    };

   var result = this._http.request('DELETE', this._settings.eventDetailUrl + '/Delete', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      }),
      body: eventDetail 
      }).pipe(
        finalize(()=>{
          this._eventDetailMessageBus.eventDetail_Service_isBusy_sendUpdate(false);
        })
      );

    

    return result;

  }
}
