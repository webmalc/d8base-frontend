import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';

@Injectable()
export class ContactFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    get controls(): string[] {
        return Object.keys(this.form.controls);
    }

    public createForm(contactList: Contact[], userContactList: UserContact[]): FormGroup {
        return this.form = this.formBuilder.group(this.generate(contactList, userContactList));
    }

    public isDisabled(): boolean {
        return this.form.invalid || !this.form.dirty;
    }

    private generate(list: Contact[], userContactList: UserContact[]): object {
        const def = {};
        list.forEach(contact => {
            def[contact.name] = [this.getUserContactValueByName(contact.name, userContactList)];
        });

        return def;
    }

    private getUserContactValueByName(needle: string, userContactList: UserContact[]): string {
        for (const contact of userContactList) {
            if (contact.contact_display === needle) {
                return contact.value;
            }
        }

        return '';
    }
}
