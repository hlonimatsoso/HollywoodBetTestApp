import { Component, OnInit } from '@angular/core';
import {EventDetailMessageBusService} from '../../../core/shared/services/event-detail-message-bus.service'
import {EventDetail} from '../../../core/models/EventDetail'
import {EventDetailsService} from '../../../core/shared/services/event-details.service'

@Component({
  selector: 'app-event-detail-list',
  templateUrl: './event-detail-list.component.html',
  styleUrls: ['./event-detail-list.component.css']
})
export class EventDetailListComponent implements OnInit {
  public _eventDetails:EventDetail[];
  enableEditing:boolean
  eventServiceIsBusy:boolean;

  get isEventListEmpty(){
    return this._eventDetails.length == 0;
  }

  constructor(private _service:EventDetailsService,private _messageBus: EventDetailMessageBusService) {
    
    this._messageBus.eventDetail_ToolBar_isEditEnabled$.subscribe(value =>{ 
      console.log(`EventDetailList.constructor()._messageBus.eventDetail_ToolBar_isEditEnabled$(): Last Update -> ${value}`);
      this.enableEditing = value 
    });

    this._messageBus.eventDetail_ToolBar_newEventDetail$.subscribe(value =>{
      console.log(`EventDetailList.constructor()._messageBus.eventDetail_ToolBar_newEvent$(): Last Update -> ${value}`);
      debugger;
      this._eventDetails.push(value); 
      // relolad  hack
      this.ngOnInit();
    });

    this._messageBus.eventDetail_ToolBar_updatedEventDetail$.subscribe(value =>{ 
      console.log(`EventDetailList.constructor()._messageBus.eventDetailToolBar_updatedEvent$(): Last Update -> ${value}`);
      
      const index = this._eventDetails.findIndex(t => t.eventID == value.eventID);
      console.log(`EventDetailList.constructor()._messageBus.eventToolBar_updatedEvent$(): Before Event UI list update: (${this._eventDetails[index].eventID}) ${this._eventDetails[index].eventDetailName}`);
      this._eventDetails[index].eventDetailName = value.eventDetailName;
      console.log(`EventDetailList.constructor()._messageBus.eventDetail_ToolBar_updatedEvent$(): After Event UI list update: (${this._eventDetails[index].eventID}) ${this._eventDetails[index].eventDetailName}`);
    });

      this._messageBus.eventDetail_Service_isBusy$.subscribe(value =>{ 
      console.log(`EventDetailList.constructor()._messageBus.eventDetail_Service_isBusy$(): Last update:  ${value}`);
      this.eventServiceIsBusy = value; 
    });

    this._messageBus.eventDetail_ToolBar_deleteEventDetailList$.subscribe(list =>{ 
      console.log(`EventDetailList.constructor()._messageBus.eventDetailToolBar_deleteEventList$(): Last update:  ${list}`);
     
      for (let i in list) {
        var idToRemove = Number.parseInt(list[i].eventID.toString());
        this._eventDetails.splice(idToRemove, 1);
        console.log(`EventDetailList.constructor()._messageBus.eventDetail_ToolBar_deleteEventList$(): Removed (${idToRemove}) ${JSON.stringify(list[i]) } from the UI list array`);
      }

      /*
      currently a hack to refresh UI. i need to find a suitable binding stratergy for seemless updates 
      and will sorting this out will also prevent any possible meemory leaks incase I dont unsubscribe from current subscriptions 
      */ 
     // Refreshing UI in a hacky way. FIX HACK!
      this.ngOnInit();
    });

   }

  ngOnInit(): void {
    this._eventDetails =  [];
    this._service.getAllEventDetails().subscribe(list => {
        this._eventDetails = list;
        console.log(`EventDetail List:  events Service results: ${JSON.stringify(this._eventDetails)}`);
    });
  }
}
