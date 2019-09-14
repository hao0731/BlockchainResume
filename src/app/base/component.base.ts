import { Injector } from '@angular/core';
import { ProviderService } from '../services/provider/provider.service';

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

    public transactionError(): void {
        this.isPending = false;
        this.isError = true;
    }
}
