import { Component, OnInit, Input } from '@angular/core';
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError,finalize, tap, map }               from 'rxjs/operators';
import {RaceEvent} from '../../../core/models/RaceEvent';
import {EditingOptions} from '../../../core/models/EditingOption';
import {EventService} from '../../../core/shared/services/event.service'



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


   activeToolBarButtonChange(event:any){
     console.log(`${JSON.stringify(event.value)}`);
     this.event.reset();
      this._messageBus.eventToolBar_activeEditingOption_sendUpdate(event.value);
   }

  constructor(private _messageBus: MessageBusService, private _eventService:EventService) {
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
      
      this.event.setValue(this.activeEventForEditing.Name); 
    });

    this._messageBus.eventCard_deleteEvent$.subscribe(event =>{ 
      this.deleteList.push(event);
      console.log(`EventToolbar.ngOnInit()._messageBus.eventCard_deleteEvent$: Flagged to be deleted -> ${event.Name}`);
    
    });

  }

  event = new FormControl('', [Validators.required]);
  buttonText:string;

  getErrorMessage() {
    if (this.event.hasError('required')) {
      return 'Enter a valid event name';
    }
  }

  get selectedBUttonText(){
    return `${this.activeToolBarButton} RaceEvent`;
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

    console.log(this.event.value);
 
    if(this.activeToolBarButton == "Add"){
      this.addEvent(this.event.value);
    }else if(this.activeToolBarButton == "Edit"){
      this.updateEvent(this.event.value);
    }else{
      this.deleteEvent();
    }

    this.event.reset();
  }

  addEvent(name:string){

    const event = {} as RaceEvent;
    event.Name = name;

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
    t.Name = name;
    t.RaceEventID = this.activeEventForEditing.RaceEventID;

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
