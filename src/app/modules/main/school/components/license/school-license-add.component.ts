import { Component, Injector } from '@angular/core';
import { ComponentBase } from 'src/app/base/component.base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-school-license-add',
    templateUrl: './school-license-add.component.html',
    styleUrls: ['./school-license-add.component.scss']
})
export class SchoolLicenseAddComponent extends ComponentBase {
    public licenseForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.licenseForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]],
            name: ['', [Validators.required]],
            content: ['', [Validators.required]]
        });
    }

    public addLicense(data: any): void {
        const resume = this.providerSvc.getResume(data.contract);
        resume.methods.setLicense(data.name, data.content)
        .send({ from: this.providerSvc.defaultAccount })
        .on('receipt', receipt => {
            this.transactionConfirmed();
            this.licenseForm.reset();
            this.setFormDisabled(this.licenseForm, false);
        })
        .on('error', err => {
            this.transactionError();
            this.licenseForm.reset();
            this.setFormDisabled(this.licenseForm, false);
        });
    }

}
