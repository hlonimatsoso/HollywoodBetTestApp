import { Component, OnInit } from '@angular/core';
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {RaceEvent} from '../../../core/models/RaceEvent'
import {EventService} from '../../../core/shared/services/event.service'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public _events:RaceEvent[];
  enableEditing:boolean
  eventServiceIsBusy:boolean;

  get isEventListEmpty(){
    return this._events.length == 0;
  }

  constructor(private _service:EventService,private _messageBus: MessageBusService) {
    
    this._messageBus.eventToolBar_isEditEnabled$.subscribe(value =>{ 
      console.log(`EventList.constructor()._messageBus.eventToolBar_isEditEnabled$(): Last Update -> ${value}`);
      this.enableEditing = value 
    });

    this._messageBus.eventToolBar_newEvent$.subscribe(value =>{
      console.log(`EventList.constructor()._messageBus.eventToolBar_newEvent$(): Last Update -> ${value}`);
      this._events.push(value); 
      // relolad  hack
      this.ngOnInit();
    });

    this._messageBus.eventToolBar_updatedEvent$.subscribe(value =>{ 
      console.log(`EventList.constructor()._messageBus.eventToolBar_updatedEvent$(): Last Update -> ${value}`);
      
      const index = this._events.findIndex(t => t.RaceEventID == value.RaceEventID);
      console.log(`EventList.constructor()._messageBus.eventToolBar_updatedEvent$(): Before Event UI list update: (${this._events[index].RaceEventID}) ${this._events[index].Name}`);
      this._events[index].Name = value.Name;
      console.log(`EventList.constructor()._messageBus.eventToolBar_updatedEvent$(): After Event UI list update: (${this._events[index].RaceEventID}) ${this._events[index].Name}`);
    });

      this._messageBus.eventService_isBusy$.subscribe(value =>{ 
      console.log(`EventList.constructor()._messageBus.eventService_isBusy$(): Last update:  ${value}`);
      this.eventServiceIsBusy = value; 
    });

    this._messageBus.eventToolBar_deleteEventList$.subscribe(list =>{ 
      console.log(`EventList.constructor()._messageBus.eventToolBar_deleteEventList$(): Last update:  ${list}`);
     
      for (let i in list) {
        var idToRemove = Number.parseInt(list[i].RaceEventID.toString());
        this._events.splice(idToRemove, 1);
        console.log(`EventList.constructor()._messageBus.eventToolBar_deleteEventList$(): Removed (${idToRemove}) ${JSON.stringify(list[i]) } from the UI list array`);
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
    this._events =  [];
    this._service.getAllEvents().subscribe(list => {
        this._events = list;
        console.log(`RaceEvent List:  events Service results: ${JSON.stringify(this._events)}`);
    });
  }
}
