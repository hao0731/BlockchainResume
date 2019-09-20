import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolRoutingModule } from './school-routing.module';
import { BootstrapModule } from '../../shared/bootstrap/bootstrap.module';

import { SchoolComponent } from './school.component';
import { SchoolEducationAddComponent } from './components/education/school-education-add.component';
import { SchoolCourseAddComponent } from './components/course/school-course-add.component';
import { SchoolLicenseAddComponent } from './components/license/school-license-add.component';

@NgModule({
    declarations: [
        SchoolComponent,
        SchoolEducationAddComponent,
        SchoolCourseAddComponent,
        SchoolLicenseAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapModule,
        SchoolRoutingModule
    ]
})
export class SchoolModule { }
