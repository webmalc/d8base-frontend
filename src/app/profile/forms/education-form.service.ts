import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EducationFormFields} from '@app/profile/enums/education-form-fields';
import {Certification} from '@app/profile/models/certification';
import {Education} from '@app/profile/models/education';
import {CertificationApiService} from '@app/profile/services/certification-api.service';
import {EducationApiService} from '@app/profile/services/education-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class EducationFormService {

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private educationApiService: EducationApiService,
        private certificationApiService: CertificationApiService
    ) {
    }

    public getForm(): Observable<FormGroup> {
        return forkJoin({
            education: this.educationApiService.getCurrentMasterEducation(),
            certifications: this.certificationApiService.getCurrentMasterCertifications()
        }).pipe(
            switchMap(
                ({education, certifications}) => of(this.createForm(education, certifications))
            )
        );
    }

    get certifications(): FormArray {
        return this.form.get(EducationFormFields.Certifications) as FormArray;
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid);
    }

    public addCertification(certification?: Certification): void {
        this.certifications.push(
            this.formBuilder.group({
                [EducationFormFields.Certification_title]: certification?.title ?? '',
                [EducationFormFields.Certification_photo]: certification?.photo ?? '',
                [EducationFormFields.Certification_link]: certification?.link ?? ''
            })
        );
    }

    public removeCertification(index: number): void {
        this.certifications.removeAt(index);
    }

    private createForm(education: Education, certifications: Certification[]): FormGroup {
        this.form = this.formBuilder.group({
            [EducationFormFields.Experience]: [
                education.experience, [
                    Validators.required
                ]
            ],
            [EducationFormFields.Education]: [
                education.education, [
                    Validators.required
                ]
            ],
            [EducationFormFields.Certifications]: this.formBuilder.array([])
        });

        certifications.forEach(
            (certification: Certification) => this.addCertification(certification)
        );

        return this.form;
    }
}
