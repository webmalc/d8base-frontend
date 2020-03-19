import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EducationFormFields} from '@app/profile/enums/education-form-fields';
import {Education} from '@app/profile/models/education';
import {EducationCertificate} from '@app/profile/models/education-certificate';
import {CertificateApiService} from '@app/profile/services/certificate-api.service';
import {EducationApiService} from '@app/profile/services/education-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class EducationFormService {

    public form: FormGroup;
    private defaultCertificationsCount: number;

    constructor(
        private formBuilder: FormBuilder,
        private educationApiService: EducationApiService,
        private certificationApiService: CertificateApiService
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
        return this.form.get(EducationFormFields.Certificates) as FormArray;
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid || this.certifications.length !== this.defaultCertificationsCount);
    }

    public addCertification(certificate?: EducationCertificate): void {
        this.certifications.push(
            this.formBuilder.group({
                [EducationFormFields.Certificate_title]: certificate?.title ?? '',
                [EducationFormFields.Certificate_photo]: certificate?.photo ?? '',
                [EducationFormFields.Certificate_link]: certificate?.link ?? ''
            })
        );
    }

    public removeCertification(index: number): void {
        this.certifications.removeAt(index);
    }

    private createForm(education: Education, certificates: EducationCertificate[]): FormGroup {
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
            [EducationFormFields.Certificates]: this.formBuilder.array([])
        });

        this.defaultCertificationsCount = certificates.length;
        certificates.forEach(
            (certificate: EducationCertificate) => this.addCertification(certificate)
        );

        return this.form;
    }
}
