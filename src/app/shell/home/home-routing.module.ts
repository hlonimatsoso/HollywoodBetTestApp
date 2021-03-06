import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component'
import { TournamentListComponent } from '../../modules/tournament/tournament-list/tournament-list.component';
import {IndexComponent} from '../../shell/home/index/index.component'

export const routes: Routes = [
  { 
    path: '', 
    component:HomeComponent, 
    pathMatch: 'full',
    children:[
      {
        path:'',
        component:IndexComponent,
        pathMatch:'full'
      },
      {
        path:'tournament',
        component:TournamentListComponent,
        pathMatch:'full'
      },
      { 
        path: 'events', 
        loadChildren: () => import('../../modules/event/event.module').then(m => m.EventModule) 
      },
      { 
        path: 'horses', 
        loadChildren: () => import('../../modules/event-detail/event-detail.module').then(m => m.EventDetailModule) 
      }
    ]
  }
  
  // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
