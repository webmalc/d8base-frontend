import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Country, UserContact } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { ContactsApiCache } from '@app/core/services/cache';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import * as UserContactActions from '@app/store/current-user/user-contacts/user-contacts.actions';
import UserContactSelectors from '@app/store/current-user/user-contacts/user-contacts.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-contact-edit',
  templateUrl: './user-contact-edit.component.html',
  styleUrls: ['./user-contact-edit.component.scss'],
  providers: [NgDestroyService],
})
export class UserContactEditComponent implements OnInit {
  @Select(UserContactSelectors.contacts)
  public contacts$: Observable<UserContact[]>;

  @Select(CurrentUserSelectors.profileCountry)
  public profileCountry$: Observable<Country['id']>;

  public selectOptions: Contact[];

  public contact$: Observable<UserContact>;
  public contactItems$: Observable<Contact[]>;

  private contactId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly destroy$: NgDestroyService,
    private readonly contactsApiCache: ContactsApiCache,
  ) {}

  public ngOnInit(): void {
    const snapshot = this.route.snapshot;
    this.contactId = parseInt(snapshot.paramMap.get('contact-id'), 10);
    const defaultContactId = parseInt(snapshot.paramMap.get('default-contact-id'), 10);
    const newContact = { contact: defaultContactId, id: null, value: '' };

    this.contact$ = this.contacts$.pipe(
      filter(contacts => Boolean(contacts)),
      map(
        contacts =>
          contacts?.find(({ id }) => this.contactId === id) || newContact,
      ),
    );

    this.subscribeToActionSuccess();
    this.initContactItems();
  }

  @Dispatch()
  public deleteContactAction(id: UserContact['id']): UserContactActions.DeleteUserContact {
    return new UserContactActions.DeleteUserContact(id);
  }

  @Dispatch()
  public createContactAction(contact: UserContact): UserContactActions.CreateUserContact {
    return new UserContactActions.CreateUserContact(contact);
  }

  @Dispatch()
  public updateContactAction(contact: UserContact): UserContactActions.UpdateUserContact {
    return new UserContactActions.UpdateUserContact(contact);
  }

  public deleteContact(id: UserContact['id']): void {
    this.deleteContactAction(id);
  }

  public saveContact(contact: UserContact): void {
    if (contact.id) {
      this.updateContactAction(contact);
    } else {
      this.createContactAction(contact);
    }
  }

  private initContactItems(): void {
    this.contactItems$ = this.profileCountry$.pipe(
      filter(country => Boolean(country)),
      switchMap(profileCountry => this.contactsApiCache.listByCountry(profileCountry)),
    );
  }

  private subscribeToActionSuccess(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(
          UserContactActions.CreateUserContact,
          UserContactActions.DeleteUserContact,
          UserContactActions.UpdateUserContact,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }
}
