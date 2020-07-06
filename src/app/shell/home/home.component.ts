import { Component, OnInit } from '@angular/core';
import {MessageBusService} from '../../core/shared/services/message-bus.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _messageBus:MessageBusService,private _spinner: NgxSpinnerService) { 
    this._messageBus.tournamentService_isBusy$.subscribe(value =>{
      if(value)
        this._spinner.show();
      else
        this._spinner.hide();

    });
  }

  ngOnInit(): void {
  }
  showSpinner() {
    this._spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this._spinner.hide();
    }, 5000);
  }
  
}
