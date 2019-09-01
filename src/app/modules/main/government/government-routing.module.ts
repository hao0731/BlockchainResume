import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GovernmentComponent } from './government.component';

const routes: Routes = [
  { path: '', component: GovernmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernmentRoutingModule { }
