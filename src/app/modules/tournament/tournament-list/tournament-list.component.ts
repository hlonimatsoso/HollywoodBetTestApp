import { Component, OnInit ,Input} from '@angular/core';
import {TournamentsService} from '../../../core/shared/services/tournaments.service'
import {Tournament} from '../../../core/models/Tournament'
import {MessageBusService} from '../../../core/shared/services/message-bus.service'


@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  public _tournaments:Tournament[];
  enableEditing:boolean
  tournamentServiceIsBusy:boolean;

  constructor(private _service:TournamentsService,private _messageBus: MessageBusService) {
    
    this._messageBus.tournamentToolBox_isEditEnabled$.subscribe(value =>{ 
      console.log(`Tournament List: tournamentToolBox_isEditEnabled$ : ${value}`);
      this.enableEditing = value 
    });

    this._messageBus.tournamentToolBox_newTournament$.subscribe(value =>{ 
      console.log(`Tournament List: tournamentToolBox_newTournament$ : ${value}`);
      this._tournaments.push(value); 
    });

    this._messageBus.tournamentService_isBusy$.subscribe(value =>{ 
      console.log(`Tournament List: tournamentService_isBusy$ : ${value}`);
      this.tournamentServiceIsBusy = value; 
    });

   }

  ngOnInit(): void {
    
    this._service.getTournaments().subscribe(list => {
        this._tournaments = list;
        console.log(`Tournament List:  Tournaments Service results: ${JSON.stringify(this._tournaments)}`);
    });
  }

}
