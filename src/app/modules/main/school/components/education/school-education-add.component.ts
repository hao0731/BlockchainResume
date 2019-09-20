import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';
import { EducationStatus } from 'src/app/types';

@Component({
    selector: 'app-school-education-add',
    templateUrl: './school-education-add.component.html',
    styleUrls: ['./school-education-add.component.scss']
})
export class SchoolEducationAddComponent extends ComponentBase {
    public educationForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.educationForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]],
            major: ['', [Validators.required]],
            status: [EducationStatus.undergraduate, [Validators.required]]
        });
    }

    public addEducation(data: any): void {
        this.isPending = true;
        this.setFormDisabled(this.educationForm);
        const resume = this.providerSvc.getResume(data.contract);
        resume.methods.setEducation(data.status, data.major)
        .send({ from: this.providerSvc.defaultAccount })
        .on('receipt', receipt => {
            this.transactionConfirmed();
            this.educationForm.reset();
            this.setFormDisabled(this.educationForm, false);
        })
        .on('error', err => {
            this.transactionError(err.message);
            this.educationForm.reset();
            this.setFormDisabled(this.educationForm, false);
        });
    }



}
