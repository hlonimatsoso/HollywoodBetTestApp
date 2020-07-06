import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component'
import {HeaderComponent} from '../header/header.component'
import {FooterComponent} from '../footer/footer.component'
import {IndexComponent} from '../home/index/index.component'
import {HomeRoutingModule} from '../home/home-routing.module'
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module'
import {CoreModule} from '../../core/core.module'
import {SharedModule} from '../../core/shared/shared.module'


@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomMaterialModule,
    CoreModule,
    SharedModule
  ]
})
export class HomeModule { }
