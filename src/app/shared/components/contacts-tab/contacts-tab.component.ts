import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {fromEntries} from '@app/shared/functions';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-contacts-tab',
    templateUrl: './contacts-tab.component.html',
    styleUrls: ['./contacts-tab.component.scss']
})
export class ContactsTabComponent implements OnInit, OnChanges {

    public static submitThis: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Input() public gridSizes: GridSizesInterface;
    @Input() public clientContactsApiService: ContactsApiServiceInterface;
    @Input() public getNewClientContact: () => ClientContactInterface;
    @Input() public clientId: number;
    @Input() public toFillFormData: ClientContactInterface[] = [];
    @Input() public submittable: boolean = true;
    private readonly contactsList: string[] = [];
    private defaultClientContacts: ClientContactInterface[];

    constructor(
        public formService: ContactsTabFormService,
        private readonly contactApiService: ContactApiService
    ) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('toFillFormData') && changes.toFillFormData.currentValue.length > 0) {
            this.fillForm(changes.toFillFormData.currentValue);
        }
    }

    public ngOnInit(): void {
        this.contactApiService.get().pipe(
            tap((result: ApiListResponseInterface<Contact>) => this.generateContactArray(result.results))
        ).subscribe(
            (result: ApiListResponseInterface<Contact>) => {
                this.updateDefaultClientContacts().subscribe(
                    (data: ClientContactInterface[]) => {
                        this.formService.createForm(result.results, data);
                        if (this.toFillFormData.length > 0) {
                            this.fillForm(this.toFillFormData);
                        }
                    }
                );
            }
        );

        ContactsTabComponent.submitThis.pipe(
            filter(isUpdated => true === isUpdated)
        ).subscribe(() => this.submitContacts());
    }

    public submitContacts(): void {
        const userContactsToCreate = this.getClientContactsToCreate(this.formService.form.getRawValue());
        const userContactsToUpdate = this.getClientContactsToUpdate(this.formService.form.getRawValue());
        const userContactsToDelete = this.getClientContactsToDelete(this.formService.form.getRawValue());
        forkJoin([
            this.clientContactsApiService.createList(userContactsToCreate),
            this.clientContactsApiService.putList(userContactsToUpdate),
            this.clientContactsApiService.deleteList(userContactsToDelete)
        ]).pipe(
            switchMap(() => this.updateDefaultClientContacts())
        ).subscribe(() => {
            // TODO: show feedback about operation success
        });
    }

    private fillForm(data: ClientContactInterface[]): void {
        this.formService.fillForm(data);
        this.submitContacts();
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
        const entries = Object.entries(contactsData).filter(([name, value]) => this.isDefaultContact(name, value));
        const copy = fromEntries(entries);

        return this.generateUserContacts(copy);
    }

    private isDefaultContact(name: string, value: unknown): boolean {
        if (!value) {
            return true;
        }

        return !!this.defaultClientContacts.find(userContact => userContact.contact_display === name);
    }

    private getClientContactsToUpdate(contactsData: object): ClientContactInterface[] {
        return Object.entries(contactsData).map(
            ([contactName, contactValue]) => {
                if (!contactValue) {
                    return null;
                }
                const userContact = this.defaultClientContacts.find(x => x.contact_display === contactName);

                return userContact.value === contactValue ? null : {
                    ...userContact,
                    value: contactValue
                };
            }
        ).filter(Boolean);
    }

    private generateUserContacts(contactsData: object): ClientContactInterface[] {
        return Object.entries(contactsData).map(([contactName, contactValue]) => ({
            ...this.getNewClientContact(),
            contact_display: contactName,
            value: contactValue,
            contact: this.contactsList[contactName]
        }));
    }

    private generateContactArray(contactsList: Contact[]): void {
        contactsList.forEach(contact => this.contactsList[contact.name] = contact.id);
    }
}
