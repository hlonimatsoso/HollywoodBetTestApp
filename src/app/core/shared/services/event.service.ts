import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {SettingsService} from '../../settings/settings.service'
import {Tournament} from '../../models/Tournament'
import {Observable, of, throwError as observableThrowError, from} from 'rxjs';
import {map, tap,finalize,catchError } from 'rxjs/operators';
import {BaseServiceService} from '../../shared/services/base-service.service'
import { BehaviorSubject } from 'rxjs'; 
import {MessageBusService} from '../../shared/services/message-bus.service'
import { RaceEvent } from '../../models/RaceEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseServiceService {

  _httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'//,
      //'Authorization': token
    })
  };

  constructor(private _http:HttpClient, private _settings:SettingsService, private _messageBus:MessageBusService) { 
    super();
  }

  // getEvents(){
    
  //   this._messageBus.tournamentService_isBusy_sendUpdate(true);



  //   return this._http.get<RaceEvent[]>(this._settings.eventsUrl, this._httpOptions)
  //               .pipe(
  //                 tap(x => console.log(`EventService.getAllEvents().tap() : Result -> ${JSON.stringify(x)}`)),
  //                 finalize (()=>{
  //                   this._messageBus.tournamentService_isBusy_sendUpdate(false);
  //                   console.log(`EventService.getAllEvents().finalize(): HTTP request complete.`);
  //                 }),
  //                 catchError( this.handleError)
  //               );
  // }

  getAllEvents():Observable<any>{
    
    this._messageBus.eventService_isBusy_sendUpdate(true);
   
    return this._http.get<any>(this._settings.eventsUrl, this._httpOptions)
               .pipe(
                tap(x => {
                  console.log(`EventService.getAllEvents().tap(): Got all events & letting the world know -> ${JSON.stringify(x)}`);
                  //this._messageBus.eventToolBar_getAllEvents_sendUpdate(x);
                }),
                  finalize (()=>{
                    this._messageBus.tournamentService_isBusy_sendUpdate(false);
                    console.log(`EventService.getAllEvents().finalize(): HTTP request complete.`);
                  }),
                  catchError( this.handleError)
                );
  }

  

  addEvent (event: RaceEvent):any {
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    console.log(`EventService.addEvent(): HTTP Post to '${this._settings.eventsUrl}' with  ` + JSON.stringify(event));

    var result = this._http.post<RaceEvent>(this._settings.eventsUrl,event, this._httpOptions)
      .pipe(
        tap((x)=>{ console.log(`EventService.addEvent().Tap(): Result -> ` + x) }),
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
          console.log(`EventService.addEvent().finalize(): HTTP request complete.`);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  
  updateEvent (event: RaceEvent): any {
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    console.log(`EventService.updateEvent(): HTTP Post to '${this._settings.eventsUrl}' with  ` + JSON.stringify(event));

    event.eventID = Number.parseInt(event.eventID.toString());

    var result = this._http.post<RaceEvent>(this._settings.eventsUrl, event, this._httpOptions)
      .pipe(
        tap((x)=>{ console.log(`EventService.updateEvent().Tap(): Result -> ` + x) }),
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
          console.log(`EventService.updateEvent().finalize(): HTTP request complete.`);
        }),
        catchError(this.handleError)
      );

      return result;
  }

  deleteEvent(events:RaceEvent[]){
    this._messageBus.tournamentService_isBusy_sendUpdate(true);

    for (let i in events) {
      events[i].eventID = Number.parseInt(events[i].eventID.toString());
    }
    
   console.log(`EventService.deleteEvent(): HTTP Delete to '${this._settings.eventsUrl}/Delete' with  ` + JSON.stringify(events));

   var result = this._http.request('DELETE', this._settings.eventsUrl + '/Delete', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json'//,
        //'Authorization': token
      }),
      body: events 
      }).pipe(
        tap((x)=>{ console.log(`EventService.deleteEvent().Tap(): Result -> ` + x) }),
        finalize(()=>{
          this._messageBus.tournamentService_isBusy_sendUpdate(false);
          console.log(`EventService.deleteEvent().finalize(): HTTP request complete.`);
        }),
        catchError(this.handleError)
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
