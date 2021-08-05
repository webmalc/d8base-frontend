import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessionalCertificate } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { getNoAvatarLink } from '@app/core/functions/media.functions';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss'],
})
export class CertificateEditComponent {
  @Output() public readonly saveEmitter = new EventEmitter<ProfessionalCertificate>();
  @Output() public readonly deleteEmitter = new EventEmitter<ProfessionalCertificate>();

  public nameControl = new FormControl('', Validators.required);
  public organizationControl = new FormControl('', Validators.required);
  public dateControl = new FormControl(null);
  public idControl = new FormControl(null);
  public urlControl = new FormControl(null);
  public photoControl = new FormControl('');

  public form: FormGroup;
  public photo$: Observable<string>;
  public initialValue: ProfessionalCertificate;

  constructor() {
    this.form = this.createForm();
    this.photo$ = this.photoControl.valueChanges.pipe(
      startWith(''),
      map(value => value || getNoAvatarLink()),
    );
  }

  @Input()
  public set item(item: ProfessionalCertificate) {
    this.initialValue = item;
    this.setFormValues(item);
  }

  public get canDelete(): boolean {
    return Boolean(this.initialValue?.id);
  }

  public save(): void {
    if (isFormInvalid(this.form)) {
      return;
    }
    const updatedValue: ProfessionalCertificate = {
      ...this.initialValue,
      ...this.form.value,
    };
    this.saveEmitter.emit(updatedValue);
  }

  public delete(): void {
    this.deleteEmitter.emit(this.initialValue);
  }

  private createForm(): FormGroup {
    const controls: { [key in keyof Partial<ProfessionalCertificate>]: FormControl } = {
      name: this.nameControl,
      organization: this.organizationControl,
      date: this.dateControl,
      certificate_id: this.idControl,
      url: this.urlControl,
      photo: this.photoControl,
    };
    return new FormGroup(controls);
  }

  private setFormValues(values: ProfessionalCertificate): void {
    this.form.patchValue(values);
  }
}
