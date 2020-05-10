import {Component, Input, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-contacts-tab',
    templateUrl: './contacts-tab.component.html',
    styleUrls: ['./contacts-tab.component.scss'],
})
export class ContactsTabComponent implements OnInit {

    @Input() public clientContactsApiService: ContactsApiServiceInterface;
    @Input() public getNewClientContact: () => ClientContactInterface;
    @Input() public clientId: number;
    private contactsList: string[] = [];
    private defaultClientContacts: ClientContactInterface[];

    constructor(
        public formService: ContactsTabFormService,
        private contactApiService: ContactApiService
    ) {
    }

    public ngOnInit(): void {
        this.contactApiService.get().pipe(
            tap((result: ApiListResponseInterface<Contact>) => this.generateContactArray(result.results))
        ).subscribe(
            (result: ApiListResponseInterface<Contact>) => {
                this.updateDefaultClientContacts().subscribe(
                    (data: ClientContactInterface[]) => this.formService.createForm(result.results, data)
                );
            }
        );
    }

    public submitContacts(): void {
        const userContactsToCreate = this.getClientContactsToCreate(this.formService.form.getRawValue());
        const userContactsToUpdate = this.getClientContactsToUpdate(this.formService.form.getRawValue());
        const userContactsToDelete = this.getClientContactsToDelete(this.formService.form.getRawValue());
        forkJoin([
            this.clientContactsApiService.saveList(userContactsToCreate),
            this.clientContactsApiService.updateList(userContactsToUpdate),
            this.clientContactsApiService.deleteList(userContactsToDelete)
        ]).subscribe(
            () => this.updateDefaultClientContacts().subscribe(() => console.log('saved'))
        );

    }

    private updateDefaultClientContacts(): Observable<ClientContactInterface[]> {
        return this.clientContactsApiService.getByClientId(this.clientId).pipe(
            tap((contactsList: ApiListResponseInterface<ClientContactInterface>) => this.defaultClientContacts = contactsList.results),
            map((contactsList: ApiListResponseInterface<ClientContactInterface>) => contactsList.results)
        );
    }

    private getClientContactsToDelete(contactsData: object): ClientContactInterface[] {
        const toDelete: ClientContactInterface[] = [];
        for (const contactName in contactsData) {
            if ('' === contactsData[contactName]) {
                this.defaultClientContacts.forEach(
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

    private getClientContactsToCreate(contactsData: object): ClientContactInterface[] {
        for (const contactName in contactsData) {
            if ('' === contactsData[contactName]) {
                delete contactsData[contactName];
                continue;
            }
            this.defaultClientContacts.forEach(
                userContact => {
                    if (userContact.contact_display === contactName) {
                        delete contactsData[contactName];
                    }
                }
            );
        }

        return this.generateUserContacts(contactsData);
    }

    private getClientContactsToUpdate(contactsData: object): ClientContactInterface[] {
        const updatedContacts: ClientContactInterface[] = [];
        for (const contactName in contactsData) {
            this.defaultClientContacts.forEach(
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

    private generateUserContacts(contactsData: object): ClientContactInterface[] {
        const userContacts: ClientContactInterface[] = [];
        for (const contactName in contactsData) {
            const newUserContact = this.getNewClientContact();
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
