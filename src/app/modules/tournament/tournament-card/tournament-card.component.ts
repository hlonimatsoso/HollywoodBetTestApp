import { Component, OnInit, Input } from '@angular/core';
import {Tournament} from '../../../core/models/Tournament'
import {MessageBusService} from '../../../core/shared/services/message-bus.service'
import {EditingOptions} from '../../../core/models/EditingOption'



@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input() tournament: Tournament;
  @Input() enableEditing:boolean;
  
  constructor(private _messageBus:MessageBusService) { }

  ngOnInit(): void {
  }

  edit(x){
    console.log(`Tournament active card changing to : ${x}`);
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-tournamentid").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-tournamentname").value;
    var tourn = new Tournament(id,name);

    
    console.log(`Tournament active card changing to (TOURN) : ${tourn}`);

    this._messageBus.tournamentToolBar_activeEditingOption_sendUpdate("Edit");
    this._messageBus.tournamentToolBar_activeEditingTournament_sendUpdate(tourn);

  }

  delete(x){
   
    var id:number = x.currentTarget.attributes.getNamedItem("data-tournamentid").value;
    var name:string = x.currentTarget.attributes.getNamedItem("data-tournamentname").value;
    var tourn = new Tournament(id,name);

    console.log(`Tournament Card: deleting ${tourn}`);

    this._messageBus.tournamentCard_deleteTournament_sendUpdate(tourn);
    this._messageBus.tournamentToolBar_activeEditingOption_sendUpdate("Delete");


  }

}
