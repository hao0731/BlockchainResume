import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
            contract: ['', [Validators.required, this.addressValidator]],
            contact: ['', [Validators.required]],
            autobiography: ['', [Validators.required]],
            skills: this.formBuilder.array([this.createSkillFields()])
        });
    }

    public updateProfile(data: any): void {
        console.log(data);
    }

    public addSkillField(): void {
        const skills = this.profileForm.controls.skills as FormArray;
        skills.push(this.createSkillFields());
    }

    public removeSkillField(index: number) {
        const skills = this.profileForm.controls.skills as FormArray;
        skills.removeAt(index);
    }

    private createSkillFields(): FormGroup {
        return this.formBuilder.group({
            class: ['', [Validators.required]],
            name: ['', [Validators.required]]
        });
    }

}
