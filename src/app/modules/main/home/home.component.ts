import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase {
    public contractForm: FormGroup;
    public profile: any = null;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.contractForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]]
        });
    }

    public getProfile(contract: string): void {
        const resume = this.providerSvc.getResume(contract);
        this.providerSvc.executeMethod(resume.methods.profile().call());
    }

}
