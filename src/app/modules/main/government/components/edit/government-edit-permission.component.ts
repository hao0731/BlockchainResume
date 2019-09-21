import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
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
            this.providerSvc.executeMethod(
                resume.methods.setPermission(data.address, data.name, data.type, data.permission)
                .send({ from: this.providerSvc.defaultAccount })
            ).pipe(
                take(1)
            ).subscribe(
                receipt => {
                    this.transactionConfirmed();
                    this.editForm.reset();
                    this.setFormDisabled(this.editForm, false);
                },
                err => {
                    this.transactionError(err.message);
                    this.editForm.reset();
                    this.setFormDisabled(this.editForm, false);
                }
            );
        } else {
            this.providerSvc.executeMethod(
                resume.methods.removePermission(data.address)
                .send({ from: this.providerSvc.defaultAccount })
            ).pipe(
                take(1)
            ).subscribe(
                receipt => {
                    this.transactionConfirmed();
                    this.editForm.reset();
                    this.setFormDisabled(this.editForm, false);
                },
                err => {
                    this.transactionError(err.message);
                    this.editForm.reset();
                    this.setFormDisabled(this.editForm, false);
                }
            );
        }
    }

}
