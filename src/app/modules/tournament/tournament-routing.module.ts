import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TournamentListComponent} from './tournament-list/tournament-list.component'
import { HomeService } from '../../shell/home/home.service';

export const routes: Routes = [
  HomeService.childRoutes([
    { path: 'tournament', component:TournamentListComponent, pathMatch: 'full'}
  ])
  
  // { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
  // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }