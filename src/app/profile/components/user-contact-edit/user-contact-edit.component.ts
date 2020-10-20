import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-user-contact-edit',
    templateUrl: './user-contact-edit.component.html',
    styleUrls: ['./user-contact-edit.component.scss'],
})
export class UserContactEditComponent implements OnInit, OnDestroy {

    public contact: ClientContactInterface;
    public selectOptions: Contact[] = [];
    public selectedContact: Contact;
    public form: FormGroup;
    private isMasterContacts: boolean;
    private sub: Subscription;
    private clientContactsApiService: ContactsApiServiceInterface;

    constructor(
        private readonly userContactApiService: UserContactApiService,
        private readonly masterContactApiService: MasterContactsApiService,
        private readonly route: ActivatedRoute,
        private readonly contactsApi: ContactApiService,
        private readonly formBuilder: FormBuilder,
        private readonly location: Location,
        private readonly masterManager: MasterManagerService
    ) {
    }

    public deleteContact(): void {
        if (parseInt(this.route.snapshot.paramMap.get('contact-id'), 10)) {
            this.clientContactsApiService.delete(this.contact).subscribe(() => console.log('deleted'));
        }
        this.location.back();
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public pickApiService(): Promise<void> {
        return new Promise<void>(resolve => this.sub = this.route.data.subscribe(data => {
            this.clientContactsApiService = data.isMaster ? this.masterContactApiService : this.userContactApiService;
            this.isMasterContacts = data.isMaster;
            resolve();
        }));
    }

    public async ngOnInit(): Promise<void> {
        await this.pickApiService();
        const contactId = parseInt(this.route.snapshot.paramMap.get('contact-id'), 10);
        const defaultContactId = parseInt(this.route.snapshot.paramMap.get('default-contact-id'), 10);
        if (defaultContactId) {
            this.contactsApi.getByEntityId(defaultContactId).subscribe(
                contact => {
                    this.selectedContact = contact;
                    this.selectOptions.push(contact);
                    this.createForm(contact);
                    this.disableContact();
                }
            );

            return;
        }
        if (contactId) {
            this.clientContactsApiService.getByEntityId(contactId).subscribe(
                (result: ClientContactInterface) => {
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
                userContacts: this.clientContactsApiService.getCurrentClientContacts()
            }).subscribe(
                ({contacts, userContacts}) => {
                    this.createForm();
                    this.selectOptions = HelperService.calculateContacts(contacts.results, userContacts.results);
                }
            );
        }
    }

    public submitForm(): void {
        if (parseInt(this.route.snapshot.paramMap.get('contact-id'), 10)) {
            this.contact.value = this.form.getRawValue().userContact;
            this.clientContactsApiService.put(this.contact).subscribe(
                res => console.log(res)
            );
        } else {
            this.getNewClientContactModel().subscribe(
                contact => {
                    contact.value = this.form.getRawValue().userContact;
                    contact.contact = this.form.getRawValue().contact;
                    this.clientContactsApiService.create(contact).subscribe(
                        res => console.log(res)
                    );
                }
            );
        }
        this.location.back();
    }

    private disableContact(): void {
        this.form.controls.contact.disable();
    }

    private createForm(contact?: Contact, userContact?: ClientContactInterface): void {
        this.form = this.formBuilder.group({
            contact: [contact?.id, [Validators.required]],
            userContact: [userContact?.value, [Validators.required]]
        });
    }

    private getNewClientContactModel(): Observable<ClientContactInterface> {
        if (this.isMasterContacts) {
            return this.masterManager.getMasterList().pipe(
                map(list => {
                    const contact = new MasterContact();
                    contact.professional = list[0].id;

                    return contact;
                })
            );
        }

        return of(new UserContact());
    }
}
