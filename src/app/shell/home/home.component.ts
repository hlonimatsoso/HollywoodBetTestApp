import { Component, OnInit } from '@angular/core';
import {merge, first } from 'rxjs/operators';


import {MessageBusService} from '../../core/shared/services/message-bus.service'
import {EventDetailMessageBusService} from '../../core/shared/services/event-detail-message-bus.service'

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _messageBus:MessageBusService,private _spinner: NgxSpinnerService, private _eventDetailEventBUs:EventDetailMessageBusService) { 
    
  }

  ngOnInit(): void {
    // var firstMege = merge(this._messageBus.eventService_isBusy$,this._messageBus.tournamentService_isBusy$);
    // var finalMege = merge(firstMege,this._eventDetailEventBUs.eventDetail_Service_isBusy$);

    this._messageBus.tournamentService_isBusy$.subscribe(x=>{
      if(x)
        this._spinner.show();
      else
        this._spinner.hide();
    });


    this._messageBus.eventService_isBusy$.subscribe(x=>{
      if(x)
        this._spinner.show();
      else
        this._spinner.hide();
     });
    
    this._eventDetailEventBUs.eventDetail_Service_isBusy$.subscribe(x=>{
      if(x)
        this._spinner.show();
      else
        this._spinner.hide();
    });
   
 
  }

  toggleSpinner(value:boolean){
    //debugger;
    if(value)
      this._spinner.show();
    else
      this._spinner.hide();
  }

  showSpinner() {
    this._spinner.show();
    setTimeout(() => {
        this._spinner.hide();
    }, 5000);
  }
  
}
