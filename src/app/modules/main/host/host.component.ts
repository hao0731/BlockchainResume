import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';

@Component({
    selector: 'app-host',
    templateUrl: './host.component.html',
    styleUrls: ['./host.component.scss']
})
export class HostComponent extends ComponentBase {
    public profileForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.profileForm = this.formBuilder.group({
            contact: ['', [Validators.required]],
            autobiography: ['', [Validators.required]]
        });
    }

}
