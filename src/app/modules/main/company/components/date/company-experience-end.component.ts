import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ComponentBase } from 'src/app/base/component.base';

@Component({
  selector: 'app-company-experience-end',
  templateUrl: './company-experience-end.component.html',
  styleUrls: ['./company-experience-end.component.scss']
})
export class CompanyExperienceEndComponent extends ComponentBase {
    public endDateForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.endDateForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]],
            endDate: ['', [Validators.required]]
        });
    }

    public setEndDate(data: any): void {
        data.endDate = new Date(data.endDate.year, data.endDate.month - 1, data.endDate.day).valueOf();
        this.isPending = true;
        this.setFormDisabled(this.endDateForm);
        const resume = this.providerSvc.getResume(data.contract);
        this.providerSvc.executeMethod(
            resume.methods.setJobEndDate(data.endDate)
            .send({ from: this.providerSvc.defaultAccount })
        ).pipe(
            take(1)
        ).subscribe(
            receipt => {
                this.transactionConfirmed();
                this.endDateForm.reset();
                this.setFormDisabled(this.endDateForm, false);
            },
            err => {
                this.transactionError();
                this.endDateForm.reset();
                this.setFormDisabled(this.endDateForm, false);
            }
        );
    }

}
