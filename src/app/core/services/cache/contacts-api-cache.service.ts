import { Injectable } from '@angular/core';
import { Contact } from '@app/api/models';
import { ContactsService } from '@app/api/services';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactsApiCache {
  private readonly cache = new Map<string, Observable<Contact>>();
  private readonly listCache$: Observable<Contact[]>;
  private listByCountryCache$: Observable<Contact[]>;
  private countryId: number;

  constructor(private readonly contactsService: ContactsService) {
    this.listCache$ = this.contactsService.contactsContactsList({}).pipe(
      map(({ results }) => results),
      shareReplay(1),
    );
  }

  public list(): Observable<Contact[]> {
    return this.listCache$;
  }

  public listByCountry(countryId: number): Observable<Contact[]> {
    if (countryId !== this.countryId) {
      this.countryId = countryId;
      this.listByCountryCache$ = this.contactsService.contactsContactsList({ byCountry: countryId }).pipe(
        map(({ results }) => results),
        shareReplay(1),
      );
    }
    return this.listByCountryCache$;
  }

  public listDefaultByCountry(countryId: number): Observable<Contact[]> {
    return this.listByCountry(countryId).pipe(map(contacts => contacts.filter(contact => Boolean(contact.is_default))));
  }

  public getByEntityId(id: string): Observable<Contact> {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.read(id).pipe(shareReplay(1)));
    }

    return this.cache.get(id);
  }

  private read(id: string): Observable<Contact> {
    return this.contactsService.contactsContactsRead(parseInt(id, 10));
  }
}
