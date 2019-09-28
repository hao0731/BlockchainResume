import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ComponentBase } from 'src/app/base/component.base';
import { ProfileModel } from 'src/app/types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase {
    public contractForm: FormGroup;
    public profile: ProfileModel = null;
    public skills = null;

    public loaded = false;

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
        const countReq = [];

        this.loaded = false;
        this.profile = new ProfileModel(resume);

        countReq.push(this.providerSvc.executeMethod(resume.methods.getEducationCount().call()));
        countReq.push(this.providerSvc.executeMethod(resume.methods.getExperienceCount().call()));
        countReq.push(this.providerSvc.executeMethod(resume.methods.getSkillCount().call()));

        forkJoin(countReq).pipe(
            switchMap(res => {
                this.profile.setCounts(res);
                return this.profile.setEducations();
            }),
            switchMap(() => this.profile.setExperiences()),
            switchMap(() => this.profile.setSkills()),
            take(1)
        ).subscribe(() => {
            this.dealSkills();
            this.loaded = true;
        });
    }

    private dealSkills(): void {
        const skills = this.profile.skills.items;
        const classBuffer = skills.map(x => x.class);
        const noRepeatClass = classBuffer.filter((val, i, arr) => arr.indexOf(val) === i);
        const sk = [];
        noRepeatClass.forEach(key => {
          sk.push({
              class: key,
              items: skills.filter(x => x.class === key).map(x => x.name)
          });
        });
        this.skills = sk;
    }

}
