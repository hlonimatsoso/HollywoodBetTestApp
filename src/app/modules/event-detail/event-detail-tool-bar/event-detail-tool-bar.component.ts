import { Component, OnInit, Input } from '@angular/core';
import {EventDetailMessageBusService} from '../../../core/shared/services/event-detail-message-bus.service'
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError,finalize, tap, map }               from 'rxjs/operators';
import {EventDetail} from '../../../core/models/EventDetail';
import {EventService} from '../../../core/shared/services/event.service'
import {EventDetailsService} from '../../../core/shared/services/event-details.service'
import {OhGreatOracleService} from '../../../core/shared/services/oh-great-oracle.service'
import { EventDetailStatus } from 'src/app/core/models/EventDetailStatus';




@Component({
  selector: 'app-event-detail-tool-bar',
  templateUrl: './event-detail-tool-bar.component.html',
  styleUrls: ['./event-detail-tool-bar.component.css']
})
export class EventDetailToolBarComponent implements OnInit {

  @Input() public enableEditing:boolean;
  
   activeToolBarButton:string;

   activeEventDetailForEditing:EventDetail;

   deleteList:EventDetail[];

   event = new FormControl('', [Validators.required]);

   eventDetailName = new FormControl('', [Validators.required]);

   eventDetailOdd = new FormControl('', [Validators.required]);

   finishingPosition = new FormControl('', [Validators.required,Validators.min(1),Validators.max(12)]);

   eventDetailStatus = new FormControl('', [Validators.required]);





   activeToolBarButtonChange(event:any){
     console.log(`${JSON.stringify(event.value)}`);
     this.eventDetailName.reset();
      this._messageBus.eventDetail_ToolBar_activeEditingOption_sendUpdate(event.value);
   }

  constructor(private _messageBus: EventDetailMessageBusService,
              private _eventService:EventService, 
              private _eventDetailService:EventDetailsService,
              private _ohGreatOracle:OhGreatOracleService) {
    this.deleteList = [];
   }

  ngOnInit(): void {
    
    this._messageBus.eventDetail_ToolBar_isEditEnabled$.subscribe(value =>{ this.enableEditing = value });
    this._messageBus.eventDetail_ToolBar_activeEditingOption$.subscribe(value =>{ 
      this.activeToolBarButton = value;
      console.log(`EventDetailToolbar.ngOnInit()._messageBus.eventDetail_ToolBar_activeEditingOption$: Value -> ${value}`);
    });

    /*
    
    */
    this._messageBus.eventDetail_ToolBar_activeEditingEventDetail$.subscribe(horse =>{ 
      this.activeEventDetailForEditing = horse;
      console.log(`EventDetailToolbar.ngOnInit()._messageBus.eventDetailToolBar_activeEditingEventDetail$: Horse currently being updated is -> ${horse}`);
      
      this.eventDetailName.setValue(this.activeEventDetailForEditing.eventDetailName); 
    });

    this._messageBus.eventDetail_Card_deleteEventDetail$.subscribe(horse =>{ 
      this.deleteList.push(horse);
      console.log(`EventDetailToolbar.ngOnInit()._messageBus.eventDetailCard_deleteEventDetail$: Flagged to be deleted -> ${horse.eventDetailName}`);
    
    });

  }


  get getEventDetailNameValidationMessage() {
    if (this.eventDetailName.hasError('required')) {
      return 'Enter a valid horse name';
    }else{
      console.log(`EventToolBar.getEventDetailNameValidationMessage(): something...`);
    }
  }

  get getEventValidationMessage() {
    if (this.event.hasError('required')) {
      return 'Select any of the avaialble events';
    }
  }

  get getEventDetailStatusValidationMessage() {
    if (this.eventDetailStatus.hasError('required')) {
      return 'Select any of the avaialble statuses';
    }
  }

  get getEventDetailOddValidationMessage() {
    if (this.eventDetailOdd.hasError('required')) {
      return 'Enter a valid numeric value';
    }
  }

  get getFinishingPositionValidationMessage() {
    if (this.finishingPosition.hasError('required')) {
      return 'Enter a value between 1 & 12';
    }
  }

  get selectedBUttonText(){
    return `${this.activeToolBarButton} Event`;
  }

  get areAllInputsValid(){
    var result = false;
    result = this.eventDetailName.valid     &&
             this.event.valid   &&
             this.eventDetailStatus.valid;//     &&
             //this.eventDetailOdd.valid     &&
             //this.finishingPosition.valid;
    //console.log(`EventToolBar.FormValidations.areAllInputsValid(): Result -> ${result}`);
    return result;
  }

  get currentEventList(){
    return this._ohGreatOracle.events;
  }

  remove(t: EventDetail): void {
    const index = this.deleteList.indexOf(t);

    if (index >= 0) {
      this.deleteList.splice(index, 1);
    }
  }

  onEnableEditingChanged(x:boolean)
  {
    console.log(x);
    this._messageBus.eventDetail_ToolBar_isEditEnabled_sendUpdate(x);
    console.log(`EventToolbar.onEnableEditingChanged()._messageBus.eventDetailToolBar_isEditEnabled_sendUpdate(): Value -> ${x}`);

    // indirectly/dymanically set the default option to "Add" upon enabling editing  
    this._messageBus.eventDetail_ToolBar_activeEditingOption_sendUpdate("Add");
    console.log(`EventToolbar.onEnableEditingChanged()._messageBus.eventDetailToolBar_activeEditingOption_sendUpdate(): Value -> ${x}`);

  }

  
  RunUpdate(){

    //console.log(this.eventDetailName.value);
 
    if(this.activeToolBarButton == "Add"){
      this.addEventDetail();
    }else if(this.activeToolBarButton == "Edit"){
      this.updateEventDetail(this.eventDetailName.value);
    }else{
      this.deleteEvent();
    }

    this.eventDetailName.reset();
  }

  addEventDetail(){

    
    const detail = {} as EventDetail;
    detail.eventDetailName = this.eventDetailName.value;
    detail.event = this.event.value;
    detail.eventDetailStatus = this.eventDetailStatus.value;
    detail.eventDetailOdd = this.eventDetailOdd.value;
    detail.finishingPosition = this.finishingPosition.value;
    
    
    this._eventDetailService.addEventDetail(detail)
        .pipe(
          tap(data => {
            //console.log('server data:', data)
            this._messageBus.eventDetail_ToolBar_newEventDetail_sendUpdate(detail);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          console.log('subscrfiption data:', result)

        });
  }

  updateEventDetail(name:string){
    //const t = new RaceEvent(this.activeEventForEditing.eventID,name);
    const t = {} as EventDetail;
    t.eventDetailName = name;
    t.eventID = this.event.value;
    t.eventDetailStatusID = this.eventDetailStatus.value;
    t.eventDetailOdd = this.eventDetailOdd.value;
    t.finishingPosition = this.finishingPosition.value;

    this._eventDetailService.updateEventDetail(t)
        .pipe(
          tap(data => {
            //console.log('server data:', data)
            this._messageBus.eventDetail_ToolBar_updatedEventDetail_sendUpdate(t);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          //console.log('subscrfiption data:', result)

        });
  }

  deleteEvent(){
    this._eventDetailService.deleteEventDetail(this.deleteList)
    .pipe(
      finalize(()=>{
        console.log(`EventDetail_Toolbar.deleteEvent().finalize(): Delete request complete.`);
        this._messageBus.eventDetail_ToolBar_deleteEventDetailList_sendUpdate(this.deleteList);
        this.deleteList = [];
        console.log(`EventDetail_Toolbar.deleteEvent().finalize()._messageBus().eventToolBar_deleteEventDetailList_sendUpdate: List deleted -> ${this.deleteList}`);
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
