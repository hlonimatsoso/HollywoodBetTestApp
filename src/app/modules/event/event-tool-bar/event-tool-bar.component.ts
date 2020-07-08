import { Component, OnInit, Input } from '@angular/core';
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError,finalize, tap, map }               from 'rxjs/operators';
import {RaceEvent} from '../../../core/models/RaceEvent';
import {EditingOptions} from '../../../core/models/EditingOption';
import {EventService} from '../../../core/shared/services/event.service'
import {TournamentsService} from '../../../core/shared/services/tournaments.service'
import {OhGreatOracleService} from '../../../core/shared/services/oh-great-oracle.service'



@Component({
  selector: 'app-event-tool-bar',
  templateUrl: './event-tool-bar.component.html',
  styleUrls: ['./event-tool-bar.component.css']
})
export class EventToolBarComponent implements OnInit {

  @Input() public enableEditing:boolean;
  
   activeToolBarButton:string;

   activeEventForEditing:RaceEvent;

   deleteList:RaceEvent[];

   eventName = new FormControl('', [Validators.required]);

   eventNumber = new FormControl('', [Validators.required,Validators.min(0), Validators.max(65536)]);

   eventDate = new FormControl('', [Validators.required]);

   eventEndDate = new FormControl('', [Validators.required]);

   autoClose = new FormControl('', [Validators.required]);

   tournament = new FormControl('', [Validators.required]);




   activeToolBarButtonChange(event:any){
     console.log(`${JSON.stringify(event.value)}`);
     this.eventName.reset();
      this._messageBus.eventToolBar_activeEditingOption_sendUpdate(event.value);
   }

  constructor(private _messageBus: MessageBusService,
              private _eventService:EventService, 
              private _tournamentsService:TournamentsService,
              private _ohGreatOracle:OhGreatOracleService) {
    this.deleteList = [];
   }

  ngOnInit(): void {
    
    this._messageBus.eventToolBar_isEditEnabled$.subscribe(value =>{ this.enableEditing = value });
    this._messageBus.eventToolBar_activeEditingOption$.subscribe(value =>{ 
      this.activeToolBarButton = value;
      console.log(`EventToolbar.ngOnInit()._messageBus.eventToolBar_activeEditingOption$: Value -> ${value}`);
    });

    /*
    
    */
    this._messageBus.eventToolBar_activeEditingEvent$.subscribe(event =>{ 
      this.activeEventForEditing = event;
      console.log(`EventToolbar.ngOnInit()._messageBus.eventToolBar_activeEditingEvent$: Race Event currently being updated is -> ${event}`);
      
      this.eventName.setValue(this.activeEventForEditing.eventName); 
    });

    this._messageBus.eventCard_deleteEvent$.subscribe(event =>{ 
      this.deleteList.push(event);
      console.log(`EventToolbar.ngOnInit()._messageBus.eventCard_deleteEvent$: Flagged to be deleted -> ${event.eventName}`);
    
    });

  }


  get getEventNameValidationMessage() {
    if (this.eventName.hasError('required')) {
      return 'Enter an event name';
    }else{
      console.log(`EventToolBar.getEmailValidationMessage(): something...`);
    }
  }

  get getEventNumberValidationMessage() {
    if (this.eventName.hasError('required')) {
      return 'Enter a valid event number';
    }
  }

  get getEventDateValidationMessage() {
    if (this.eventDate.hasError('required')) {
      return 'Enter a valid event start date';
    }
  }

  get getEventEndDateValidationMessage() {
    if (this.eventEndDate.hasError('required')) {
      return 'Enter a valid event end date';
    }
  }

  get getAutoCloseValidationMessage() {
    if (this.eventEndDate.hasError('required')) {
      return 'Choose if event should auto close';
    }
  }

  get selectedBUttonText(){
    return `${this.activeToolBarButton} Event`;
  }

  get areAllInputsValid(){
    var result = false;
    result = this.eventName.valid     &&
             this.eventNumber.valid   &&
             this.eventDate.valid     &&
             this.autoClose.valid     &&
             this.eventEndDate.valid  &&
             this.tournament.valid;
    //console.log(`EventToolBar.FormValidations.areAllInputsValid(): Result -> ${result}`);
    return result;
  }

  get currentTournamentList(){
    return this._ohGreatOracle.tournaments;
  }

  remove(t: RaceEvent): void {
    const index = this.deleteList.indexOf(t);

    if (index >= 0) {
      this.deleteList.splice(index, 1);
    }
  }

  onEnableEditingChanged(x:boolean)
  {
    console.log(x);
    this._messageBus.eventToolBar_isEditEnabled_sendUpdate(x);
    console.log(`EventToolbar.onEnableEditingChanged()._messageBus.eventToolBar_isEditEnabled_sendUpdate(): Value -> ${x}`);

    // indirectly/dymanically set the default option to "Add" upon enabling editing  
    this._messageBus.eventToolBar_activeEditingOption_sendUpdate("Add");
    console.log(`EventToolbar.onEnableEditingChanged()._messageBus.eventToolBar_activeEditingOption_sendUpdate(): Value -> ${x}`);

  }

  
  RunUpdate(){

    console.log(this.eventName.value);
 
    if(this.activeToolBarButton == "Add"){
      this.addEvent();
    }else if(this.activeToolBarButton == "Edit"){
      this.updateEvent(this.eventName.value);
    }else{
      this.deleteEvent();
    }

    this.eventName.reset();
  }

  addEvent(){

    
    const event = {} as RaceEvent;
    event.eventName = this.eventName.value;
    event.autoClose = this.autoClose.value;
    event.eventNumber = this.eventNumber.value;
    event.eventDateTime = this.eventDate.value;
    event.eventEndDateTime = this.eventEndDate.value;
    event.tournamentID = this.tournament.value;



    this._eventService.addEvent(event)
        .pipe(
          tap(data => {
            //console.log('server data:', data)
            this._messageBus.eventToolBar_newEvent_sendUpdate(event);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          console.log('subscrfiption data:', result)

        });
  }

  updateEvent(name:string){
    //const t = new RaceEvent(this.activeEventForEditing.eventID,name);
    const t = {} as RaceEvent;
    t.eventName = name;
    t.eventID = this.activeEventForEditing.eventID;

    this._eventService.updateEvent(t)
        .pipe(
          tap(data => {
            //console.log('server data:', data)
            this._messageBus.eventToolBar_updatedEvent_sendUpdate(t);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          //console.log('subscrfiption data:', result)

        });
  }

  deleteEvent(){
    this._eventService.deleteEvent(this.deleteList)
    .pipe(
      finalize(()=>{
        console.log(`EventToolbar.deleteEvent().finalize(): Delete request complete.`);
        this._messageBus.eventToolBar_deleteEventList_sendUpdate(this.deleteList);
        this.deleteList = [];
        console.log(`EventToolbar.deleteEvent().finalize()._messageBus().eventToolBar_deleteEventList_sendUpdate: List deleted -> ${this.deleteList}`);
      })
    )
    .subscribe(o=>{
      console.log(`EventToolbar.deleteEvent().subscribe(): Delete request result -> ${o}`);
    });
  }

  httpRequestError(err: any) {
    console.log('HTTP Request Error:', err);  
  
    return Observable.throw(err || 'HTTP Request Error');
  }
}
