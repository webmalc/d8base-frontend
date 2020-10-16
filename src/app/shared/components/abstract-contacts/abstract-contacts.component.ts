import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {MediaIconFactoryService} from '@app/core/services/media-icon-factory.service';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {BehaviorSubject, forkJoin, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
    selector: 'app-abstract-contacts',
    templateUrl: './abstract-contacts.component.html',
    styleUrls: ['./abstract-contacts.component.scss'],
})
export class AbstractContactsComponent extends Reinitable implements OnInit, OnDestroy {

    public static reinit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Input() public addNewContactUrl: string = '/profile/contact-add/';
    @Input() public editDefaultContactUrl: string = '/profile/contact-add-default/';
    @Input() public editContactUrl: string = '/profile/contact-edit/';
    @Input() public interactable: boolean = false;
    @Input() public contactsApiService: ContactsApiServiceInterface;
    public userContacts$: BehaviorSubject<UserContact[]> = new BehaviorSubject<UserContact[]>([]);
    public canAddNewContact$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    public defaultContacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    private subscription: Subscription = null;
    private inited: boolean = false;

    constructor(
        private contactsApi: ContactApiService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.init();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public getContactIcon(contactDisplay: string): string {
        return MediaIconFactoryService.getIcon(contactDisplay);
    }

    protected init(): void {
        this.contactsApiService.getCurrentClientContacts().subscribe(
            contacts => this.userContacts$.next(contacts.results)
        );
        this.contactsApi.get().subscribe(
            list => {
                this.contacts$.next(list.results);
                this.initDefaultContacts(list.results);
            }
        );
        this.canAddNewContact();
        this.subToReinit();
    }

    private initDefaultContacts(contacts: Contact[]): void {
        const defaultContacts: Contact[] = [];
        contacts.forEach(contact => contact.is_default ? defaultContacts.push(contact) : null);

        this.defaultContacts$.next(defaultContacts);
    }

    private subToReinit(): void {
        if (!this.inited) {
            this.inited = true;
            this.subscription = AbstractContactsComponent.reinit$.pipe(
                filter(val => val === true),
                debounceTime(150)
            ).subscribe(val => this.init());
        }
    }

    private canAddNewContact(): void {
        forkJoin({
            contacts: this.contactsApi.get(),
            userContacts: this.contactsApiService.getCurrentClientContacts()
        }).subscribe(
            ({contacts, userContacts}) => {
                if (HelperService.calculateContacts(contacts.results, userContacts.results).length === 0) {
                    this.canAddNewContact$.next(false);
                }
            }
        );
    }
}
