import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'government',
    loadChildren: () => import('./modules/main/government/government.module').then(mod => mod.GovernmentModule)
  },
  {
    path: 'host',
    loadChildren: () => import('./modules/main/host/host.module').then(mod => mod.HostModule)
  },
  {
    path: 'school',
    loadChildren: () => import('./modules/main/school/school.module').then(mod => mod.SchoolModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./modules/main/company/company.module').then(mod => mod.CompanyModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
