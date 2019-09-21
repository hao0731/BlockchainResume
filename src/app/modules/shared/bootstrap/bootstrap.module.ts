import { NgModule } from '@angular/core';
import { NgbTabsetModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbTabsetModule,
        NgbDatepickerModule
    ],
    exports: [
        NgbTabsetModule,
        NgbDatepickerModule
    ]
})
export class BootstrapModule { }
