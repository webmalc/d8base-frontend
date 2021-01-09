import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '@app/profile/models/contact';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';

@Injectable()
export class ContactsTabFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    get controls(): string[] {
        return Object.keys(this.form.controls);
    }

    public createForm(contactList: Contact[], userContactList: ClientContactInterface[]): FormGroup {
        return this.form = this.formBuilder.group(
            this.generate(contactList, userContactList),
        );
    }

    public fillForm(data: ClientContactInterface[]): void {
        data.forEach(contact => this.form.get(contact.contact_display).setValue(contact.value));
    }

    public isDisabled(): boolean {
        return this.form.invalid || !this.form.dirty;
    }

    private generate(list: Contact[], userContactList: ClientContactInterface[]): object {
        const def = { };
        list.forEach(contact => {
            def[contact.name] = [this.getUserContactValueByName(contact.name, userContactList)];
        });

        return def;
    }

    private getUserContactValueByName(needle: string, userContactList: ClientContactInterface[]): string {
        for (const contact of userContactList) {
            if (contact.contact_display === needle) {
                return contact.value;
            }
        }

        return '';
    }
}
