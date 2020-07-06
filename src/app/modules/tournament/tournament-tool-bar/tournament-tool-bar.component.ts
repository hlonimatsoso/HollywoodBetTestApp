import { Component, OnInit, Input } from '@angular/core';
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError,finalize, tap, map }               from 'rxjs/operators';
import {Tournament} from '../../../core/models/Tournament';
import {TournamentsService} from '../../../core/shared/services/tournaments.service'
@Component({
  selector: 'app-tournament-tool-bar',
  templateUrl: './tournament-tool-bar.component.html',
  styleUrls: ['./tournament-tool-bar.component.css']
})
export class TournamentToolBarComponent implements OnInit {

  @Input() public enableEditing:boolean;
  public activeToolBarButton:string;

  constructor(private _messageBus: MessageBusService, private _tournamentService:TournamentsService) { }

  ngOnInit(): void {
    this._messageBus.tournamentToolBox_isEditEnabled$.subscribe(value =>{ this.enableEditing = value });
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // onEnableEditingChanged(value){
  //   console.log(`onEnableEditingChanged: ${value[1]}`);
  //   this._messageBus.tournamentToolBox_isEditEnabled_sendUpdate(value);
  // }

  onEnableEditingChanged(x:boolean)
  {
    console.log(x);
    this._messageBus.tournamentToolBox_isEditEnabled_sendUpdate(x);

  }

  
  addTournament(){
    console.log(this.email.value);
    const t = {} as Tournament;
    t.tournamentName = this.email.value

    this._tournamentService.addTourn(t)
        .pipe(
          tap(data => {
            console.log('server data:', data)
            this._messageBus.tournamentToolBox_newTournament_sendUpdate(t);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          console.log('subscrfiption data:', result)

        });

  }

  httpRequestError(err: any) {
    console.log('HTTP Request Error:', err);  
  
    return Observable.throw(err || 'HTTP Request Error');
}

}
