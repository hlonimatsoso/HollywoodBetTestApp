import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './shell/home/home.component'
import { TournamentListComponent } from './modules/tournament/tournament-list/tournament-list.component';
import {AuthCallbackComponent} from './core/auth/auth-callback/auth-callback.component'

export const routes: Routes = [
  { path: 'auth-callback', component: AuthCallbackComponent  },
  { 
    path: '', 
    component:HomeComponent, 
    pathMatch: 'full',
    loadChildren: () => import('./shell/home/home.module').then(m => m.HomeModule) 
  }
  
  // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
