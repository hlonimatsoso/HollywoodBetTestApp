import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private svc:SettingsService) { }

  ngOnInit(): void {
    console.log(this.svc.getClientSettings);
  }

}
