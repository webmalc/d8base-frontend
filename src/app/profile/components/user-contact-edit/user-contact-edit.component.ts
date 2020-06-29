import {Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-user-contact-edit',
    templateUrl: './user-contact-edit.component.html',
    styleUrls: ['./user-contact-edit.component.scss'],
})
export class UserContactEditComponent implements OnInit {

    public contact: UserContact;
    public selectOptions: Contact[] = [];
    public selectedContact: Contact;
    public form: FormGroup;

    constructor(
        private api: UserContactApiService,
        private route: ActivatedRoute,
        private contactsApi: ContactApiService,
        private formBuilder: FormBuilder,
        private location: Location
    ) {
    }

    public static calculateContacts(contacts: Contact[], userContacts: UserContact[]): Contact[] {
        const ret = [];
        del: for (const c of contacts) {
            for (const uc of userContacts) {
                if (c.id === uc.contact) {
                    continue del;
                }
            }
            ret.push(c);
        }

        return ret;
    }

    public deleteContact(): void {
        if (parseInt(this.route.snapshot.paramMap.get('contact-id'), 10)) {
            this.api.delete(this.contact).subscribe(() => console.log('deleted'));
        }
        this.location.back();
    }

    public ngOnInit(): void {
        const contactId = parseInt(this.route.snapshot.paramMap.get('contact-id'), 10);
        if (contactId) {
            this.api.getByEntityId(contactId).subscribe(
                (result: UserContact) => {
                    this.contact = result;
                    this.contactsApi.getByEntityId(result.contact).subscribe(
                        data => {
                            this.selectOptions.push(data);
                            this.selectedContact = data;
                            this.createForm(data, result);
                            this.disableContact();
                        }
                    );
                }
            );
        } else {
            forkJoin({
                contacts: this.contactsApi.get(),
                userContacts: this.api.getCurrentClientContacts()
            }).subscribe(
                ({contacts, userContacts}) => {
                    this.createForm();
                    this.selectOptions = UserContactEditComponent.calculateContacts(contacts.results, userContacts.results);
                }
            );
        }
    }

    public submitForm(): void {
        if (parseInt(this.route.snapshot.paramMap.get('contact-id'), 10)) {
            this.contact.value = this.form.getRawValue().userContact;
            this.api.put(this.contact).subscribe(
                res => console.log(res)
            );
        } else {
            const userContact = new UserContact();
            userContact.value = this.form.getRawValue().userContact;
            userContact.contact = this.form.getRawValue().contact;
            this.api.create(userContact).subscribe(
                res => console.log(res)
            );
        }
        this.location.back();
    }

    private disableContact(): void {
        this.form.controls.contact.disable();
    }

    private createForm(contact?: Contact, userContact?: UserContact): void {
        this.form = this.formBuilder.group({
            contact: [contact?.id, [Validators.required]],
            userContact: [userContact?.value, [Validators.required]]
        });
    }
}
