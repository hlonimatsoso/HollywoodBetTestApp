import { Component, OnInit, Input } from '@angular/core';
import {EventDetail} from '../../../core/models/EventDetail'
import {EventDetailMessageBusService} from '../../../core/shared/services/event-detail-message-bus.service'

@Component({
  selector: 'app-event-detail-card',
  templateUrl: './event-detail-card.component.html',
  styleUrls: ['./event-detail-card.component.css']
})
export class EventDetailCardComponent implements OnInit {

  @Input() eventDetail: EventDetail;
  @Input() enableEditing:boolean;
  
  constructor(private _messageBus:EventDetailMessageBusService) { }

  ngOnInit(): void {
  }

  editEventDetail(x){
    
    console.log(`EventDetailCard.editEvent(): Race Event active card changing to : ${x}`);
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-RaceEventID").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-Name").value;
    var event = new EventDetail();
    event.eventID = id;
    event.eventDetailName = name;
    
    console.log(`EventDetailCard.editEvent(): Race Event active card changing to -> ${event}`);

    this._messageBus.eventDetail_ToolBar_activeEditingOption_sendUpdate("Edit");
    this._messageBus.eventDetail_ToolBar_activeEditingEventDetail_sendUpdate(event);

  }

  deleteEventDetail(x){
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-RaceEventID").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-Name").value;
    var event = new EventDetail();
    event.eventID = id;
    event.eventDetailName = name;

    console.log(`EventDetailCard: deleting ${event}`);
    console.log(`EventDetailCard.deleteEvent(): RaceEvent Card: deleting ${event}`);

    this._messageBus.eventDetail_Card_deleteEventDetail_sendUpdate(event);
    this._messageBus.eventDetail_ToolBar_activeEditingOption_sendUpdate("Delete");


  }
}

