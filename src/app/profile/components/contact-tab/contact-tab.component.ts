import {Component, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ContactsFormFields} from '@app/profile/enums/contacts-form-fields';
import {ContactFormService} from '@app/profile/forms/contact-form.service';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.scss'],
})
export class ContactTabComponent implements OnInit {

    public formFields = ContactsFormFields;
    private contactsList: string[] = [];
    private defaultUserContacts: UserContact[];

    constructor(
        public formService: ContactFormService,
        private userContactApiService: UserContactApiService,
        private contactApiService: ContactApiService
    ) {
    }

    public ngOnInit(): void {
        this.contactApiService.get().pipe(
            tap((result: ApiListResponseInterface<Contact>) => this.generateContactArray(result.results))
        ).subscribe(
            (result: ApiListResponseInterface<Contact>) => {
                this.updateDefaultUserContacts().subscribe(
                    (data: UserContact[]) => this.formService.createForm(result.results, data)
                );
            }
        );
    }

    public submitContacts(): void {
        const userContactsToCreate = this.getUserContactsToCreate(this.formService.form.getRawValue());
        const userContactsToUpdate = this.getUserContactsToUpdate(this.formService.form.getRawValue());
        const userContactsToDelete = this.getUserContactsToDelete(this.formService.form.getRawValue());
        forkJoin([
            this.userContactApiService.save(userContactsToCreate),
            this.userContactApiService.update(userContactsToUpdate),
            this.userContactApiService.delete(userContactsToDelete)
        ]).subscribe(
            () => this.updateDefaultUserContacts().subscribe(() => console.log('saved'))
        );

    }

    private updateDefaultUserContacts(): Observable<UserContact[]> {
        return this.userContactApiService.getCurrentUserContact().pipe(
            tap((contactsList: ApiListResponseInterface<UserContact>) => this.defaultUserContacts = contactsList.results),
            map((contactsList: ApiListResponseInterface<UserContact>) => contactsList.results)
        );
    }

    private getUserContactsToDelete(contactsData: object): UserContact[] {
        const toDelete: UserContact[] = [];
        for (const contactName in contactsData) {
            if ('' === contactsData[contactName]) {
                this.defaultUserContacts.forEach(
                    userContact => {
                        if (userContact.contact_display === contactName) {
                            toDelete.push(userContact);
                        }
                    }
                );
            }
        }

        return toDelete;
    }

    private getUserContactsToCreate(contactsData: object): UserContact[] {
        for (const contactName in contactsData) {
            if ('' === contactsData[contactName]) {
                delete contactsData[contactName];
                continue;
            }
            this.defaultUserContacts.forEach(
                userContact => {
                    if (userContact.contact_display === contactName) {
                        delete contactsData[contactName];
                    }
                }
            );
        }

        return this.generateUserContacts(contactsData);
    }

    private getUserContactsToUpdate(contactsData: object): UserContact[] {
        const updatedContacts: UserContact[] = [];
        for (const contactName in contactsData) {
            this.defaultUserContacts.forEach(
                userContact => {
                    if (userContact.contact_display === contactName
                        && userContact.value !== contactsData[contactName]
                        && '' !== contactsData[contactName]
                    ) {
                        userContact.value = contactsData[contactName];
                        updatedContacts.push(userContact);
                    }
                }
            );
        }

        return updatedContacts;
    }

    private generateUserContacts(contactsData: object): UserContact[] {
        const userContacts: UserContact[] = [];
        for (const contactName in contactsData) {
            const newUserContact = new UserContact();
            newUserContact.contact_display = contactName;
            newUserContact.value = contactsData[contactName];
            newUserContact.contact = this.contactsList[contactName];
            userContacts.push(newUserContact);
        }

        return userContacts;
    }

    private generateContactArray(contactsList: Contact[]): void {
        contactsList.forEach(contact => this.contactsList[contact.name] = contact.id);
    }
}
