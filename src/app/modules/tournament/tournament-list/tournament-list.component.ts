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

  get isTournamentListEmpty(){
    return this._tournaments.length == 0;
  }

  constructor(private _service:TournamentsService,private _messageBus: MessageBusService) {
    this._tournaments = [];

    this._messageBus.tournamentToolBox_isEditEnabled$.subscribe(value =>{ 
      console.log(`Tournament List: _messageBus.tournamentToolBox_isEditEnabled$ : ${value}`);
      this.enableEditing = value 
    });

    this._messageBus.tournamentToolBox_newTournament$.subscribe(value =>{ 
      debugger;
      console.log(`Tournament List: _messageBus.tournamentToolBox_newTournament$ : ${value}`);
      this._tournaments.push(value); 
      
      // relolad component hack
      this.ngOnInit();

    });

    this._messageBus.tournamentToolBar_updatedTournament$.subscribe(value =>{ 
      console.log(`Tournament List: _messageBus.tournamentToolBox_updatedTournament$ : ${value}`);
      const index = this._tournaments.findIndex(t => t.tournamentID == value.tournamentID);
      console.log(`Tournament List: Before update: (${this._tournaments[index].tournamentID}) ${this._tournaments[index].tournamentName} `);
      this._tournaments[index].tournamentName = value.tournamentName;
      console.log(`Tournament List: After update: (${this._tournaments[index].tournamentID}) ${this._tournaments[index].tournamentName} `);

     
    });

    this._messageBus.tournamentService_isBusy$.subscribe(value =>{ 
      console.log(`Tournament List: _messageBus.tournamentService_isBusy$ : ${value}`);
      this.tournamentServiceIsBusy = value; 
    });

    this._messageBus.tournamentToolBar_deleteTournamentList$.subscribe(list =>{ 
      console.log(`Tournament List: _messageBus.tournamentToolBar_deleteTournamentList$ : ${list}`);
      
      for (let i in list) {
        var idToRemove = Number.parseInt(list[i].tournamentID.toString());
        this._tournaments.splice(idToRemove, 1);
        console.log(`Removed (${idToRemove}) ${JSON.stringify(list[i]) } from the UI list array`);
      }

      /*
      currently a hack to refresh UI. i need to find a suitable binding stratergy for seemless updates 
      and will sorting this out will also prevent any possible meemory leaks incase I dont unsubscribe from current subscriptions 
      */ 
     console.log(`Refreshing UI in a hacky way. FIX HACK!`);
      this.ngOnInit();
    });

   }

  ngOnInit(): void {
    
    this._service.getTournaments().subscribe(list => {
        this._tournaments = list;
        console.log(`Tournament List:  Tournaments Service results: ${JSON.stringify(this._tournaments)}`);
    });
  }

}
