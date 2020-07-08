import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {EventDetail} from '../../models/EventDetail'


@Injectable({
  providedIn: 'root'
})
export class EventDetailMessageBusService {

  /*
  Message bus is getting too big, so this is the 1st iteration of refactoring the message into its seperate modules (ie event message & eventDetail message bus)
  */
    // Observable sources
    private _eventDetailToolBar_isEditEnabled = new Subject<boolean>();
    private _eventDetailToolBar_newEventDetail = new Subject<EventDetail>();
    private _eventDetailToolBar_getAllEventDetails = new Subject<EventDetail[]>();
    private _eventDetailToolBar_updatedEventDetail = new Subject<EventDetail>();
    private _eventDetailCard_deleteEventDetail = new Subject<EventDetail>();
    private _eventDetailToolBar_deleteEventDetailList = new Subject<EventDetail[]>();
    private _eventDetailService_isBusy = new Subject<boolean>();
    private _eventDetailToolBar_activeEditingOption = new Subject<string>();
    private _eventDetailToolBar_activeEditingEventDetail = new Subject<EventDetail>();

  // EventDetail
  get eventDetail_ToolBar_isEditEnabled$(): Observable<boolean> {
    return this._eventDetailToolBar_isEditEnabled.asObservable();
  }

  get eventDetail_ToolBar_newEventDetail$(): Observable<EventDetail> {
    return this._eventDetailToolBar_newEventDetail.asObservable();
  }

  get eventDetail_ToolBar_updatedEventDetail$(): Observable<EventDetail> {
    return this._eventDetailToolBar_updatedEventDetail.asObservable();
  }

  get eventDetail_Service_isBusy$(): Observable<boolean> {
    return this._eventDetailService_isBusy.asObservable();
  }

  get eventDetail_ToolBar_activeEditingOption$(): Observable<string> {
    return this._eventDetailToolBar_activeEditingOption.asObservable();
  }

  get eventDetail_ToolBar_activeEditingEventDetail$(): Observable<EventDetail> {
    return this._eventDetailToolBar_activeEditingEventDetail.asObservable();
  }

  get eventDetail_Card_deleteEventDetail$(): Observable<EventDetail> {
    return this._eventDetailCard_deleteEventDetail.asObservable();
  }

  get eventDetail_ToolBar_deleteEventDetailList$(): Observable<EventDetail[]> {
    return this._eventDetailToolBar_deleteEventDetailList.asObservable();
  }

  get eventDetail_ToolBar_getAllEventDetails$(): Observable<EventDetail[]> {
    return this._eventDetailToolBar_getAllEventDetails.asObservable();
  }
  constructor() { }

  // EventDetails
  public eventDetail_ToolBar_isEditEnabled_sendUpdate(isEnabled:boolean) {
    this._eventDetailToolBar_isEditEnabled.next(isEnabled);
  }

  public eventDetail_ToolBar_newEventDetail_sendUpdate(eventDetail:EventDetail) {
    this._eventDetailToolBar_newEventDetail.next(eventDetail);
  }

  public eventDetail_ToolBar_updatedEventDetail_sendUpdate(eventDetail:EventDetail) {
    this._eventDetailToolBar_updatedEventDetail.next(eventDetail);
  }

  public eventDetail_Service_isBusy_sendUpdate(isBusy:boolean) {
    this._eventDetailService_isBusy.next(isBusy);
  }

  public eventDetail_ToolBar_activeEditingOption_sendUpdate(option:string) {
    this._eventDetailToolBar_activeEditingOption.next(option);
  }

  public eventDetail_ToolBar_activeEditingEventDetail_sendUpdate(eventDetail:EventDetail) {
    this._eventDetailToolBar_activeEditingEventDetail.next(eventDetail);
  }

  public eventDetail_Card_deleteEventDetail_sendUpdate(eventDetail:EventDetail) {
    this._eventDetailCard_deleteEventDetail.next(eventDetail);
  }

  public eventDetail_ToolBar_deleteEventDetailList_sendUpdate(eventDetail:EventDetail[]) {
    this._eventDetailToolBar_deleteEventDetailList.next(eventDetail);
  }
  
  public eventDetail_ToolBar_getAllEventDetails_sendUpdate(eventDetails:EventDetail[]) {
    this._eventDetailToolBar_getAllEventDetails.next(eventDetails);
  }
}
