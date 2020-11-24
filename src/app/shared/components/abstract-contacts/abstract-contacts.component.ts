import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {MediaIconFactoryService} from '@app/core/services/media-icon-factory.service';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-abstract-contacts',
    templateUrl: './abstract-contacts.component.html',
    styleUrls: ['./abstract-contacts.component.scss']
})
export class AbstractContactsComponent extends Reinitable implements OnInit {

    @Input() public addNewContactUrl: string = '/profile/contact-add/';
    @Input() public editDefaultContactUrl: string = '/profile/contact-add-default/';
    @Input() public editContactUrl: string = '/profile/contact-edit/';
    @Input() public interactable: boolean = false;
    @Input() public clientContacts: ClientContactInterface[];
    public canAddNewContact$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    public defaultContacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

    constructor(
        private readonly contactsApi: ContactApiService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.init();
    }

    public getContactIcon(contactDisplay: string): string {
        return MediaIconFactoryService.getIcon(contactDisplay);
    }

    protected init(): void {
        this.contactsApi.get().subscribe(
            list => {
                this.contacts$.next(list.results);
                this.initDefaultContacts(list.results);
                this.canAddNewContact(list.results);
            }
        );
    }

    private initDefaultContacts(contacts: Contact[]): void {
        const defaultContacts: Contact[] = [];
        contacts.forEach(contact => contact.is_default ? defaultContacts.push(contact) : null);

        this.defaultContacts$.next(defaultContacts);
    }

    private canAddNewContact(contacts: Contact[]): void {
        this.canAddNewContact$.next(HelperService.calculateContacts(contacts, this.clientContacts).length === 0);
    }
}
