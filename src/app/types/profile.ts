import { forkJoin, Observable, from } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { EducationStatus, Gender } from './form';

export class ProfileModel {

    resume: any;

    name: string;
    age: number;
    gender: string;
    account: string;
    contact: string;
    autobiography: string;

    educations: {
        count: number;
        items: Array<Education>;
    } = { count: 0, items: [] };

    experiences: {
        count: number;
        items: Array<Experience>;
    } = { count: 0, items: [] };

    skills: {
        count: number;
        items: Array<Skill>;
    } = { count: 0, items: [] };

    constructor(resume: any) {
        this.resume = resume;
        this.setBasic();
    }

    public setBasic(): void {
        from(this.resume.methods.profile().call()).pipe(take(1)).subscribe((basic: any) => {
            this.name = basic.name;
            this.age = basic.age;
            this.gender = this.transGender(Number(basic.gender));
            this.account = basic.account;
            this.contact = basic.contact;
            this.autobiography = basic.autobiography;
        });
    }

    public setCounts(counts: Array<string>): void {
        this.educations.count = Number(counts[0]);
        this.experiences.count = Number(counts[1]);
        this.skills.count = Number(counts[2]);
    }

    public setExperiences(): Observable<any> {
        const count = this.experiences.count;
        const reqAry = [];

        if (!count) { return; }

        for (let i = 0; i < count; i++) {
            reqAry.push(from(this.resume.methods.getExperience(i).call()));
        }

        return forkJoin(reqAry).pipe(
            map(res => {
                for (const item of res) {
                    this.experiences.items.push({
                        companyName: item['0'],
                        position: item['1'],
                        startDate: this.transDate(Number(item['2'])),
                        endDate: this.transDate(Number(item['3']))
                    } as Experience);
                }
                return;
            })
        );
    }

    public setEducations(): Observable<any> {
        const count = this.educations.count;
        const reqAry = [];

        if (!count) { return; }

        for (let i = 0; i < count; i++) {
            reqAry.push(from(this.resume.methods.getEducation(i).call()));
        }

        return forkJoin(reqAry).pipe(
            switchMap(res => {
                for (const item of res) {
                    this.educations.items.push({
                        schoolName: item['0'],
                        status: this.transEducationStatus(Number(item['1'])),
                        major: item['2']
                    } as Education);
                }
                return this.setCourseCount();
            }),
            switchMap(() => this.setCourses()),
            switchMap(() => this.setLicenseCount()),
            switchMap(() => this.setLicenses())
        );
    }

    public setSkills(): Observable<any> {
        const count = this.skills.count;
        const reqAry = [];

        if (!count) { return; }

        for (let i = 0; i < count; i++) {
            reqAry.push(from(this.resume.methods.getSkill(i).call()));
        }

        return forkJoin(reqAry).pipe(
            map(res => {
                for (const item of res) {
                    this.skills.items.push({
                        class: item['0'],
                        name: item['1']
                    } as Skill);
                }
                return;
            })
        );
    }

    private setCourseCount(): Observable<any> {
        const educationCount = this.educations.count;
        const reqAry = [];

        for (let i = 0; i < educationCount; i++) {
            reqAry.push(from(this.resume.methods.getCourseCount(i).call()));
        }

        return new Observable(observer => {
            forkJoin(reqAry).pipe(take(1)).subscribe(counts => {
                for (let i = 0; i < educationCount; i++) {
                    this.educations.items[i].courses = {
                        count: (Number(counts[i]) === 1) ? 0 : Number(counts[i]) - 1,
                        items: []
                    };
                }
                observer.next();
                observer.complete();
            });
        });
    }

    private setLicenseCount(): Observable<any> {
      const educationCount = this.educations.count;
      const reqAry = [];

      for (let i = 0; i < educationCount; i++) {
          reqAry.push(from(this.resume.methods.getLicenseCount(i).call()));
      }

      return new Observable(observer => {
          forkJoin(reqAry).pipe(take(1)).subscribe(counts => {
              for (let i = 0; i < educationCount; i++) {
                  this.educations.items[i].licenses = {
                      count: (Number(counts[i]) === 1) ? 0 : Number(counts[i]) - 1,
                      items: []
                  };
              }
              observer.next();
              observer.complete();
          });
      });
    }

    private setCourses(): Observable<any> {
        const educationCount = this.educations.count;
        const forkAry = [];

        for (let i = 0; i < educationCount; i++) {
            const courseCount = this.educations.items[i].courses.count;
            const reqAry = [];
            for (let j = 1; j <= courseCount; j++) {
                reqAry.push(from(this.resume.methods.getCourse(i, j).call()));
            }
            if (reqAry.length > 0) {
                forkAry.push(forkJoin(reqAry));
            }
        }

        return new Observable(observer => {
            forkJoin(forkAry).pipe(take(1)).subscribe(res => {
                for (let i = 0; i < educationCount; i++) {
                    const courseCount = this.educations.items[i].courses.count;
                    for (let j = 1; j <= courseCount; j++) {
                        this.educations.items[i].courses.items.push({
                            courseName: res[i][j - 1]['0'],
                            content: res[i][j - 1]['1'],
                            comment: res[i][j - 1]['2'],
                            grade: res[i][j - 1]['3']
                        } as Course);
                    }
                }
                observer.next();
                observer.complete();
            });
        });
    }

    private setLicenses(): Observable<any> {
        const educationCount = this.educations.count;
        const forkAry = [];

        for (let i = 0; i < educationCount; i++) {
            const licenseCount = this.educations.items[i].licenses.count;
            const reqAry = [];
            for (let j = 1; j <= licenseCount; j++) {
                reqAry.push(from(this.resume.methods.getLicense(i, j).call()));
            }
            if (reqAry.length > 0) {
                forkAry.push(forkJoin(reqAry));
            }
        }

        return new Observable(observer => {
            forkJoin(forkAry).pipe(take(1)).subscribe(res => {
                for (let i = 0; i < educationCount; i++) {
                    const licenseCount = this.educations.items[i].licenses.count;
                    for (let j = 1; j <= licenseCount; j++) {
                        this.educations.items[i].licenses.items.push({
                            licenseName: res[i][j - 1]['0'],
                            content: res[i][j - 1]['1']
                        } as License);
                    }
                }
                observer.next();
                observer.complete();
            });
        });
    }

    private transEducationStatus(status: number): string {
        let result = '';
        switch (status) {
            case EducationStatus.graduate:
                result = '畢業';
                break;
            case EducationStatus.learning:
                result = '在學中';
                break;
            case EducationStatus.undergraduate:
                result = '肄業';
                break;
        }
        return result;
    }

    private transGender(status: number): string {
        let result = '';
        switch (status) {
            case Gender.male:
                result = '男';
                break;
            case Gender.female:
                result = '女';
                break;
            case Gender.other:
                result = '其他';
                break;
        }
        return result;
    }

    private transDate(value: number): string {
        let result = '';
        if (!value) {
            result = '尚未設置';
        }
        const date = new Date(value);
        result = `${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`;
        return result;
    }
}

export interface Education {
    schoolName: string;
    status: string;
    major: string;
    courses: {
        count: number;
        items: Array<Course>;
    };
    licenses: {
        count: number;
        items: Array<License>;
    };
}

export interface Experience {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
}

export interface Skill {
    class: string;
    name: string;
}

export interface Course {
    courseName: string;
    content: string;
    comment: string;
    grade: number;
}

export interface License {
    licenseName: string;
    content: string;
}
