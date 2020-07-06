import { Component, OnInit, Input } from '@angular/core';
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError,finalize, tap, map }               from 'rxjs/operators';
import {Tournament} from '../../../core/models/Tournament';
import {EditingOptions} from '../../../core/models/EditingOption';
import {TournamentsService} from '../../../core/shared/services/tournaments.service'
import { strict } from 'assert';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tournament-tool-bar',
  templateUrl: './tournament-tool-bar.component.html',
  styleUrls: ['./tournament-tool-bar.component.css']
})
export class TournamentToolBarComponent implements OnInit {

  @Input() public enableEditing:boolean;
  
   activeToolBarButton:string;

   activeTournamentForEditing:Tournament;

   activeToolBarButtonChange(event:any){
     console.log(`${JSON.stringify(event.value)}`);
     this.tournament.reset();
      this._messageBus.tournamentToolBar_activeEditingOption_sendUpdate(event.value);
   }

  constructor(private _messageBus: MessageBusService, private _tournamentService:TournamentsService) { }

  ngOnInit(): void {
    this._messageBus.tournamentToolBox_isEditEnabled$.subscribe(value =>{ this.enableEditing = value });
    this._messageBus.tournamentToolBar_activeEditingOption$.subscribe(value =>{ 
      this.activeToolBarButton = value;
      console.log(`Tournament toolbar: messageBus.activeToolbarButton: ${value}`);
    });

    /*
    
    */
    this._messageBus.tournamentToolBar_activeEditingTournament$.subscribe(tournament =>{ 
      this.activeTournamentForEditing = tournament;
      console.log(`Tournament toolbar: messageBus.activeEditingTournament: ${this.activeTournamentForEditing}`);
      
      this.tournament.setValue(this.activeTournamentForEditing.tournamentName); 
    });

  }

  tournament = new FormControl('', [Validators.required]);
  buttonText:string;

  getErrorMessage() {
    if (this.tournament.hasError('required')) {
      return 'Enter a valid tournament name';
    }
  }

  get selectedBUttonText(){
    return `${this.activeToolBarButton} Tournament`;
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

  
  RunUpdate(){

    console.log(this.tournament.value);
 
    if(this.activeToolBarButton == "Add"){
      this.addTournament(this.tournament.value);
    }else if(this.activeToolBarButton == "Edit"){
      this.updateTournament(this.tournament.value);
    }else{
      this.deleteTournament();
    }

    this.tournament.reset();
  }

  addTournament(name:string){

    const t = {} as Tournament;
    t.tournamentName = name;

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

  updateTournament(name:string){
    //const t = new Tournament(this.activeTournamentForEditing.tournamentID,name);
    const t = {} as Tournament;
    t.tournamentName = name;
    t.tournamentID = this.activeTournamentForEditing.tournamentID;

    this._tournamentService.updateTournament(t)
        .pipe(
          tap(data => {
            console.log('server data:', data)
            this._messageBus.tournamentToolBar_updatededTournament_sendUpdate(t);
          }),
          catchError(this.httpRequestError)
        ).subscribe(result=>{
          console.log('subscrfiption data:', result)

        });
  }

  deleteTournament(){

  }

  httpRequestError(err: any) {
    console.log('HTTP Request Error:', err);  
  
    return Observable.throw(err || 'HTTP Request Error');
  }
}
