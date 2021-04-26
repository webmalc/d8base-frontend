import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '@app/api/models';
import { ContactUnion } from '@app/core/models/contact-union';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent {
  @Input() public contactItems: Contact[];
  @Input() public set contact(contact: ContactUnion) {
    this._contact = contact;

    this.canDelete = Boolean(contact?.id);

    this.form.patchValue(contact);
    this.form.controls.contact.enable();
    if (contact?.contact) {
      this.form.controls.contact.disable();
    }
  }
  public get contact(): ContactUnion {
    return this._contact;
  }

  @Output() public delete: EventEmitter<ContactUnion['id']> = new EventEmitter<ContactUnion['id']>();
  @Output() public save: EventEmitter<ContactUnion> = new EventEmitter<ContactUnion>();

  public canDelete: boolean;

  public form: FormGroup = this.fb.group({
    contact: ['', Validators.required],
    value: ['', Validators.required],
  });
  private _contact: ContactUnion;

  constructor(private readonly fb: FormBuilder) {}

  public deleteContact(): void {
    this.delete.emit(this.contact.id);
  }

  public saveContact(): void {
    this.save.emit({ ...this.contact, ...this.form.value });
  }
}
