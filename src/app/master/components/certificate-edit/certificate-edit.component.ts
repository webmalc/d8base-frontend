import { Location } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '@app/core/services/helper.service';
import { Certificate } from '@app/master/models/certificate';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';

enum CertificateFormFields {
  name = 'name',
  organization = 'organization',
  date = 'date',
  certificate_id = 'certificate_id',
  url = 'url',
  photo = 'photo',
}

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss'],
})
export class CertificateEditComponent extends AbstractEditComponent<Certificate> implements OnChanges {
  public readonly formFields = CertificateFormFields;
  public form: FormGroup = this.fb.group({
    [this.formFields.name]: [null, Validators.required],
    [this.formFields.organization]: [null, Validators.required],
    [this.formFields.date]: [null],
    [this.formFields.certificate_id]: [null],
    [this.formFields.url]: [null],
    [this.formFields.photo]: [null],
  });

  constructor(private readonly location: Location, private readonly fb: FormBuilder) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.form.patchValue(this.item ?? {});
    }
  }

  public getPhoto(): string | SafeResourceUrl {
    const photo: string = this.form.get(this.formFields.photo).value;
    return photo ?? HelperService.getNoAvatarLink();
  }

  protected transform(data: Certificate): Certificate {
    const trans: Certificate = plainToClass(Certificate, { ...data, ...this.form.getRawValue() });
    trans.formatDate();
    if (trans.photo && (trans.photo.slice(0, 7) === 'http://' || trans.photo.slice(0, 8) === 'https://')) {
      delete trans.photo;
    }

    return trans;
  }
}
