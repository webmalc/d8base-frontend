/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Contact } from '../models/contact';
@Injectable({
  providedIn: 'root',
})
class ContactsService extends __BaseService {
  static readonly contactsContactsListPath = '/contacts/contacts/';
  static readonly contactsContactsReadPath = '/contacts/contacts/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * The contact viewset.
   * @param params The `ContactsService.ContactsContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_default`:
   *
   * - `excluded_countries`:
   *
   * - `countries`:
   *
   * - `by_country`:
   */
  contactsContactsListResponse(params: ContactsService.ContactsContactsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Contact>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isDefault != null) __params = __params.set('is_default', params.isDefault.toString());
    if (params.excludedCountries != null) __params = __params.set('excluded_countries', params.excludedCountries.toString());
    if (params.countries != null) __params = __params.set('countries', params.countries.toString());
    if (params.byCountry != null) __params = __params.set('by_country', params.byCountry.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/contacts/contacts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Contact>}>;
      })
    );
  }
  /**
   * The contact viewset.
   * @param params The `ContactsService.ContactsContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_default`:
   *
   * - `excluded_countries`:
   *
   * - `countries`:
   *
   * - `by_country`:
   */
  contactsContactsList(params: ContactsService.ContactsContactsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Contact>}> {
    return this.contactsContactsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Contact>})
    );
  }

  /**
   * The contact viewset.
   * @param id A unique integer value identifying this contact.
   */
  contactsContactsReadResponse(id: number): __Observable<__StrictHttpResponse<Contact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/contacts/contacts/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Contact>;
      })
    );
  }
  /**
   * The contact viewset.
   * @param id A unique integer value identifying this contact.
   */
  contactsContactsRead(id: number): __Observable<Contact> {
    return this.contactsContactsReadResponse(id).pipe(
      __map(_r => _r.body as Contact)
    );
  }
}

module ContactsService {

  /**
   * Parameters for contactsContactsList
   */
  export interface ContactsContactsListParams {

    /**
     * A search term.
     */
    search?: string;

    /**
     * Number of results to return per page.
     */
    pageSize?: number;

    /**
     * A page number within the paginated result set.
     */
    page?: number;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;
    isDefault?: string;
    excludedCountries?: string;
    countries?: string;
    byCountry?: number;
  }
}

export { ContactsService }
