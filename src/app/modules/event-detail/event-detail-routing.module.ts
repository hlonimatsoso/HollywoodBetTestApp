import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventDetailListComponent} from './event-detail-list/event-detail-list.component'
import {HomeService} from '../../shell/home/home.service'

export const routes: Routes = [
  HomeService.childRoutes([
    { path: 'horses', component:EventDetailListComponent, pathMatch: 'full'}
  ])
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
