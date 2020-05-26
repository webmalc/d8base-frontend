import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CertificatesFormFields} from '@app/master/enums/certificates-form-fields';
import {Certificate} from '@app/master/models/certificate';

@Injectable()
export class CertificatesFormService {

    public form: FormGroup;
    private defaultCertificatesListLength: number;

    constructor(private formBuilder: FormBuilder) { }

    public createForm(certificatesList?: Certificate[]): FormGroup {
        this.defaultCertificatesListLength = certificatesList?.length;
        this.form = this.formBuilder.group({
            [CertificatesFormFields.Certificates]: this.formBuilder.array([])
        });
        certificatesList?.forEach(certificate => this.addCertificate(certificate));

        return this.form;
    }

    public addCertificate(certificate?: Certificate): void {
        this.getCertificatesFormArray().push(
            this.formBuilder.group({
                [CertificatesFormFields.Name]: certificate?.name ?? undefined,
                [CertificatesFormFields.Organization]: certificate?.organization ?? undefined,
                [CertificatesFormFields.Date]: certificate?.date ?? undefined,
                [CertificatesFormFields.CertificateId]: certificate?.certificate_id ?? undefined,
                [CertificatesFormFields.Url]: certificate?.url ?? undefined,
                [CertificatesFormFields.Photo]: certificate?.photo ?? undefined,
                [CertificatesFormFields.ID]: certificate?.id ?? undefined
            })
        );
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid || this.getCertificatesFormArray.length !== this.defaultCertificatesListLength);
    }

    public removeCertificate(index: number): void {
        this.getCertificatesFormArray().removeAt(index);
    }

    public getCertificatesFormArray(): FormArray {
        return this.form.get(CertificatesFormFields.Certificates) as FormArray;
    }

    public getPhotoByIndex(index: number): FormControl {
        return this.getCertificatesFormArray().controls[index].get(CertificatesFormFields.Photo) as FormControl;
    }
}
