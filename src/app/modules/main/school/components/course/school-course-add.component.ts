import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from 'src/app/base/component.base';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-school-course-add',
    templateUrl: './school-course-add.component.html',
    styleUrls: ['./school-course-add.component.scss']
})
export class SchoolCourseAddComponent extends ComponentBase {
    public courseForm: FormGroup;

    constructor(
        private injector: Injector,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.courseForm = this.formBuilder.group({
            contract: ['', [Validators.required, this.addressValidator]],
            name: ['', [Validators.required]],
            content: ['', [Validators.required]],
            comment: ['', [Validators.required]],
            grade: ['', [Validators.required, Validators.pattern(/^(?:[1-9]?\d|100)$/)]]
        });
    }

    public addCourse(data: any): void {
        this.isPending = true;
        this.setFormDisabled(this.courseForm);
        const resume = this.providerSvc.getResume(data.contract);
        this.providerSvc.executeMethod(
            resume.methods.setCourse(data.name, data.content, data.comment, data.grade)
            .send({ from: this.providerSvc.defaultAccount })
        ).pipe(
            take(1)
        ).subscribe(
            receipt => {
                this.transactionConfirmed();
                this.courseForm.reset();
                this.setFormDisabled(this.courseForm, false);
            },
            err => {
                this.transactionError();
                this.courseForm.reset();
                this.setFormDisabled(this.courseForm, false);
            }
        );
    }

}
