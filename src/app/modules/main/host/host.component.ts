import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';
import { from, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

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
        this.isPending = true;
        this.setFormDisabled(this.profileForm);
        const resume = this.providerSvc.getResume(data.contract);
        const request = [];
        request.push(
            from(resume.methods.setContact(data.contact).send({ from: this.providerSvc.defaultAccount })),
            from(resume.methods.setAutobiography(data.autobiography).send({ from: this.providerSvc.defaultAccount }))
        );
        for (const skill of data.skills) {
            request.push(from(resume.methods.setSkill(skill.class, skill.name).send({ from: this.providerSvc.defaultAccount })));
        }
        forkJoin(request).pipe(take(1)).subscribe(
            res => {
                this.transactionConfirmed();
                this.profileForm.reset();
                this.setFormDisabled(this.profileForm, false);
            },
            err => {
                this.transactionError(err.message);
                this.profileForm.reset();
                this.setFormDisabled(this.profileForm, false);
            }
        );
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
