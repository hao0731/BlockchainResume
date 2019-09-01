import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GovernmentRoutingModule } from './government-routing.module';
import { GovernmentComponent } from './government.component';

@NgModule({
  declarations: [GovernmentComponent],
  imports: [
    CommonModule,
    GovernmentRoutingModule
  ]
})
export class GovernmentModule { }
