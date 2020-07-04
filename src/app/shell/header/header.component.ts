import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../core/auth/auth-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private _authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  logIn(){
    console.log("Logging in");
    this._authService. login();
  }

}
