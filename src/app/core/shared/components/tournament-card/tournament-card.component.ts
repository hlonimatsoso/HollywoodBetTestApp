import { Component, OnInit, Input } from '@angular/core';
import {Tournament} from '../../../models/Tournament'

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {

  @Input() tournament: Tournament;
  
  constructor() { }

  ngOnInit(): void {
  }

}
