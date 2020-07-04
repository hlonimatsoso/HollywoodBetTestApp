import { Component, OnInit } from '@angular/core';
import {TournamentsService} from '../../../core/shared/services/tournaments.service'
import {Tournament} from '../../../core/models/Tournament'

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  public _tournaments:Tournament[];

  constructor(private _service:TournamentsService) { }

  ngOnInit(): void {
    this._service.getTournaments().subscribe(list => {
        this._tournaments = JSON.parse(list);
        console.log(`Tournament List Subscription: ${this._tournaments}`);
    });
  }

}
