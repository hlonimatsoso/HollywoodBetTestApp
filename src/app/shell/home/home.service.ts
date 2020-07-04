import { Routes, Route } from '@angular/router';
import { Injectable } from '@angular/core';

import {HomeComponent} from './home.component'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

    /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: HomeComponent,
      children: routes,
      // =canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

}
