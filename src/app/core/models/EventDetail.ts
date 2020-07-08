import {RaceEvent} from './RaceEvent'
import {EventDetailStatus} from './EventDetailStatus'

export class EventDetail {
    eventDetailID:number;
    eventID:number;
    event:RaceEvent;
    eventDetailStatusID:number;
    eventDetailStatus:EventDetailStatus
    eventDetailName:string;
    eventDetailOdd:number;
    finishingPosition:number;
}