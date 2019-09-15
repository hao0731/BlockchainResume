import { Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProviderService } from '../services/provider/provider.service';
import { Web3Utils } from '../utils';

export class ComponentBase {
    public isPending = false;
    public isConfirmed = false;
    public isError = false;
    public errorMessage = '';

    public providerSvc: ProviderService;

    constructor(
        injector: Injector
    ) {
        this.providerSvc = injector.get(ProviderService);
    }

    public resetConfirmState(): void {
        this.isConfirmed = false;
    }

    public resetErrorState(): void {
        this.isError = false;
        this.errorMessage = '';
    }

    public transactionConfirmed(): void {
        this.isPending = false;
        this.isConfirmed = true;
    }

    public transactionError(err?: string): void {
        this.isPending = false;
        this.isError = true;
        if (err) {
            this.errorMessage = err;
        }
    }

    protected addressValidator(control: FormControl): any {
        const address = control.value;
        return Web3Utils.isAddress(address) ? null : { message: `invalid address: ${ address }` };
    }

    protected setFormDisabled(formGroup: FormGroup, disable = true): void {
        Object.keys(formGroup.controls).forEach(elem => {
            if (disable) {
                formGroup.controls[elem].disable();
            } else {
                formGroup.controls[elem].enable();
            }
        });
    }

}
