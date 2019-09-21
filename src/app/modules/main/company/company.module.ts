import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '../../shared/bootstrap/bootstrap.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyExperienceAddComponent } from './components/experience/company-experience-add.component';
import { CompanyExperienceEndComponent } from './components/date/company-experience-end.component';

@NgModule({
    declarations: [
        CompanyComponent,
        CompanyExperienceAddComponent,
        CompanyExperienceEndComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapModule,
        CompanyRoutingModule
    ]
})
export class CompanyModule { }
