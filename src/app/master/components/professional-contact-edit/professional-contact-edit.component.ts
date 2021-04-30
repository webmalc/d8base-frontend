import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, Country, ProfessionalContact, ProfessionalList } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { ContactsApiCache } from '@app/core/services/cache';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import * as ProfessionalContactActions from '@app/store/professional-page/professional-contacts/professional-contacts.actions';
import ProfessionalContactSelectors from '@app/store/professional-page/professional-contacts/professional-contacts.selectors';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-professional-contact-edit',
  templateUrl: './professional-contact-edit.component.html',
  styleUrls: ['./professional-contact-edit.component.scss'],
  providers: [NgDestroyService],
})
export class ProfessionalContactEditComponent implements OnInit {
  @Select(ProfessionalContactSelectors.contacts)
  public contacts$: Observable<ProfessionalContact[]>;

  @Select(UserLocationSelectors.defaultCountry)
  public profileCountry$: Observable<Country['id']>;

  @Select(ProfessionalPageSelectors.professional)
  public professional$: Observable<ProfessionalList>;

  public selectOptions: Contact[];

  public contact$: Observable<ProfessionalContact>;
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
    const professional = parseInt(snapshot.paramMap.get('master-id'), 10);
    const newContact = { contact: defaultContactId, id: null, value: '', professional };

    this.contact$ = this.contacts$.pipe(
      filter(contacts => Boolean(contacts)),
      map(contacts => contacts?.find(({ id }) => this.contactId === id) || newContact),
    );

    this.subscribeToActionSuccess();
    this.initContactItems();
  }

  @Dispatch()
  public deleteContactAction(id: ProfessionalContact['id']): ProfessionalContactActions.DeleteProfessionalContact {
    return new ProfessionalContactActions.DeleteProfessionalContact(id);
  }

  @Dispatch()
  public createContactAction(contact: ProfessionalContact): ProfessionalContactActions.CreateProfessionalContact {
    return new ProfessionalContactActions.CreateProfessionalContact(contact);
  }

  @Dispatch()
  public updateContactAction(contact: ProfessionalContact): ProfessionalContactActions.UpdateProfessionalContact {
    return new ProfessionalContactActions.UpdateProfessionalContact(contact);
  }

  public deleteContact(id: ProfessionalContact['id']): void {
    this.deleteContactAction(id);
  }

  public saveContact(contact: ProfessionalContact): void {
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
          ProfessionalContactActions.CreateProfessionalContact,
          ProfessionalContactActions.DeleteProfessionalContact,
          ProfessionalContactActions.UpdateProfessionalContact,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['/professional']);
      });
  }
}
