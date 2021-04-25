import { Injectable } from '@angular/core';
import { Contact, Country } from '@app/api/models';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ContactUnion } from '../models/contact-union';
import { ContactsApiCache } from './cache';

@Injectable({
  providedIn: 'root',
})
export class ContactsMergeToDefaultService {
  @Select(CurrentUserSelectors.profileCountry)
  public profileCountry$: Observable<Country['id']>;

  constructor(private readonly contactsApiCache: ContactsApiCache) {}

  public contactsMergedWithDefault(contacts$: Observable<ContactUnion[]>): Observable<ContactUnion[]> {
    return combineLatest([
      contacts$,
      this.profileCountry$.pipe(
        filter(country => Boolean(country)),
        switchMap(profileCountry => this.contactsApiCache.listDefaultByCountry(profileCountry)),
      ),
    ]).pipe(map(([contacts, defaultContacts]) => this.mergeUserWithDefaultContacts(contacts, defaultContacts)));
  }

  private mergeUserWithDefaultContacts(contacts: ContactUnion[], defaultContacts: Contact[] = []): ContactUnion[] {
    const emptyDefaultContacts: ContactUnion[] = defaultContacts
      .filter(defaultContact => !contacts?.some(({ contact }) => contact === defaultContact.id))
      .map(defaultContact => ({
        id: null,
        contact: defaultContact.id,
        contact_code: defaultContact.code,
        contact_display: defaultContact.name,
        value: '',
      }));

    return [...emptyDefaultContacts, ...contacts];
  }
}
