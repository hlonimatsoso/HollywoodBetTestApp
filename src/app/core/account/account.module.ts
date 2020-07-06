import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms'; // ReactiveFormsModule
import { RegisterComponent } from './register/register.component';
import { SharedModule }   from '../shared/shared.module';
import {CustomMaterialModule} from '../../modules/custom-material/custom-material.module'
import { AccountRoutingModule } from './account.routing-module';
//import { AuthServiceService }  from '../../core/auth/auth-service.service';

@NgModule({
  declarations: [ RegisterComponent],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule ,
    ReactiveFormsModule,
    CustomMaterialModule 
  ]
})
export class AccountModule { }
