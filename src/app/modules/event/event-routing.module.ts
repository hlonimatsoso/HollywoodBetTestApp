import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component'
import {HomeService} from '../../shell/home/home.service'

export const routes: Routes = [
  HomeService.childRoutes([
    { path: 'events', component:EventListComponent, pathMatch: 'full'}
  ])
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
