import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';
import { OrganizationType } from 'src/app/types';

@Component({
    selector: 'app-government-edit-permission',
    templateUrl: './government-edit-permission.component.html',
    styleUrls: ['./government-edit-permission.component.scss']
})
export class GovernmentEditPermissionComponent extends ComponentBase {
    public editForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.editForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]],
            address: ['', [Validators.required, this.addressValidator]],
            permission: [true, [Validators.required]],
            name: ['', [Validators.required]],
            type: [OrganizationType.school, [Validators.required]]
        });
    }

    public editPermission(data: any): void {
        this.isPending = true;
        this.setFormDisabled(this.editForm);
        const resume = this.providerSvc.getResume(data.contract);
        if (data.permission) {
            resume.methods.setPermission(data.address, data.name, data.type, data.permission)
            .send({ from: this.providerSvc.defaultAccount })
            .on('receipt', receipt => {
                this.transactionConfirmed();
                this.editForm.reset();
                this.setFormDisabled(this.editForm, false);
            })
            .on('error', err => {
                this.transactionError(err.message);
                this.editForm.reset();
                this.setFormDisabled(this.editForm, false);
            });
        } else {
            resume.methods.removePermission(data.address)
            .send({ from: this.providerSvc.defaultAccount })
            .on('receipt', receipt => {
                this.transactionConfirmed();
                this.setFormDisabled(this.editForm, false);
                this.editForm.reset();
            })
            .on('error', err => {
                this.transactionError(err.message);
                this.setFormDisabled(this.editForm, false);
                this.editForm.reset();
            });
        }
    }

}
