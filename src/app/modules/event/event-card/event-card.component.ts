import { Component, OnInit, Input } from '@angular/core';
import {RaceEvent} from '../../../core/models/RaceEvent'
import {MessageBusService} from '../../../core/shared/services/message-bus.service'

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event: RaceEvent;
  @Input() enableEditing:boolean;
  
  constructor(private _messageBus:MessageBusService) { }

  ngOnInit(): void {
  }

  editEvent(x){
    
    console.log(`EventService.editEvent(): Race Event active card changing to : ${x}`);
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-RaceEventID").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-Name").value;
    var event = new RaceEvent();
    event.RaceEventID = id;
    event.Name = name;
    
    console.log(`EventService.editEvent(): Race Event active card changing to -> ${event}`);

    this._messageBus.eventToolBar_activeEditingOption_sendUpdate("Edit");
    this._messageBus.eventToolBar_activeEditingEvent_sendUpdate(event);

  }

  deleteEvent(x){
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-RaceEventID").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-Name").value;
    var event = new RaceEvent();
    event.RaceEventID = id;
    event.Name = name;

    console.log(`RaceEvent Card: deleting ${event}`);
    console.log(`EventService.deleteEvent(): RaceEvent Card: deleting ${event}`);

    this._messageBus.eventCard_deleteEvent_sendUpdate(event);
    this._messageBus.eventToolBar_activeEditingOption_sendUpdate("Delete");


  }
}
