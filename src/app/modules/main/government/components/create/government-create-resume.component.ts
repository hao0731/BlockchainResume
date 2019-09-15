import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender, ResumeInitialOptions } from 'src/app/types';
import { ComponentBase } from 'src/app/base/component.base';

@Component({
    selector: 'app-government-create-resume',
    templateUrl: './government-create-resume.component.html',
    styleUrls: ['./government-create-resume.component.scss']
})
export class GovernmentCreateResumeComponent extends ComponentBase {
    public deployForm: FormGroup;
    public resumeInfo;

    constructor(
        private injector: Injector,
        private formBuider: FormBuilder
    ) {
        super(injector);
        this.deployForm = this.formBuider.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required, this.addressValidator]],
            age: [null, [Validators.required]],
            gender: [Gender.male, [Validators.required]]
        });
    }

    public get ageRange(): Array<number> {
        const range = [];
        for (let i = 16; i <= 100; i++) {
            range.push(i);
        }
        return range;
    }

    public get hostGender(): string {
        let result = '';
        switch (this.resumeInfo.gender) {
            case Gender.male:
              result = '男';
              break;
            case Gender.female:
              result = '女';
              break;
            case Gender.other:
              result = '其他';
        }
        return result;
    }

    public deployResume(data: ResumeInitialOptions): void {
        if (Array.isArray(data.age)) {
            data.age = data.age[0];
        }
        this.isPending = true;
        this.setFormDisabled(this.deployForm);
        this.providerSvc.deployResume(data).subscribe(
            instance => {
                this.transactionConfirmed();
                this.setFormDisabled(this.deployForm, false);
                this.deployForm.reset();
                this.resumeInfo = data;
                this.resumeInfo.address = instance.address;
            },
            err => {
                this.transactionError(err.message);
                this.setFormDisabled(this.deployForm, false);
                this.deployForm.reset();
            }
        );
    }

}
