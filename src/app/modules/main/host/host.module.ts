import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';

@NgModule({
    declarations: [
        HostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HostRoutingModule
    ]
})
export class HostModule { }
