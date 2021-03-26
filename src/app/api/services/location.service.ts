/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AlternativeName } from '../models/alternative-name';
import { City } from '../models/city';
import { Continent } from '../models/continent';
import { Country } from '../models/country';
import { District } from '../models/district';
import { Language } from '../models/language';
import { PostalCode } from '../models/postal-code';
import { Region } from '../models/region';
import { Subregion } from '../models/subregion';
@Injectable({
  providedIn: 'root',
})
class LocationService extends __BaseService {
  static readonly locationAlternativeNamesListPath = '/location/alternative-names/';
  static readonly locationAlternativeNamesReadPath = '/location/alternative-names/{id}/';
  static readonly locationCitiesListPath = '/location/cities/';
  static readonly locationCitiesReadPath = '/location/cities/{id}/';
  static readonly locationContinentsListPath = '/location/continents/';
  static readonly locationContinentsReadPath = '/location/continents/{id}/';
  static readonly locationCountriesListPath = '/location/countries/';
  static readonly locationCountriesReadPath = '/location/countries/{id}/';
  static readonly locationDistrictsListPath = '/location/districts/';
  static readonly locationDistrictsReadPath = '/location/districts/{id}/';
  static readonly locationLanguagesListPath = '/location/languages/';
  static readonly locationLanguagesReadPath = '/location/languages/{id}/';
  static readonly locationPostalCodesListPath = '/location/postal-codes/';
  static readonly locationPostalCodesReadPath = '/location/postal-codes/{id}/';
  static readonly locationRegionsListPath = '/location/regions/';
  static readonly locationRegionsReadPath = '/location/regions/{id}/';
  static readonly locationSubregionsListPath = '/location/subregions/';
  static readonly locationSubregionsReadPath = '/location/subregions/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * The AlternativeName viewset.
   * @param params The `LocationService.LocationAlternativeNamesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `language_code`:
   *
   * - `kind`:
   *
   * - `is_short`:
   *
   * - `is_preferred`:
   *
   * - `is_historic`:
   *
   * - `is_colloquial`:
   */
  locationAlternativeNamesListResponse(params: LocationService.LocationAlternativeNamesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AlternativeName>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.languageCode != null) __params = __params.set('language_code', params.languageCode.toString());
    if (params.kind != null) __params = __params.set('kind', params.kind.toString());
    if (params.isShort != null) __params = __params.set('is_short', params.isShort.toString());
    if (params.isPreferred != null) __params = __params.set('is_preferred', params.isPreferred.toString());
    if (params.isHistoric != null) __params = __params.set('is_historic', params.isHistoric.toString());
    if (params.isColloquial != null) __params = __params.set('is_colloquial', params.isColloquial.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/alternative-names/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AlternativeName>}>;
      })
    );
  }
  /**
   * The AlternativeName viewset.
   * @param params The `LocationService.LocationAlternativeNamesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `language_code`:
   *
   * - `kind`:
   *
   * - `is_short`:
   *
   * - `is_preferred`:
   *
   * - `is_historic`:
   *
   * - `is_colloquial`:
   */
  locationAlternativeNamesList(params: LocationService.LocationAlternativeNamesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<AlternativeName>}> {
    return this.locationAlternativeNamesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<AlternativeName>})
    );
  }

  /**
   * The AlternativeName viewset.
   * @param id A unique integer value identifying this alternative name.
   */
  locationAlternativeNamesReadResponse(id: number): __Observable<__StrictHttpResponse<AlternativeName>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/alternative-names/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AlternativeName>;
      })
    );
  }
  /**
   * The AlternativeName viewset.
   * @param id A unique integer value identifying this alternative name.
   */
  locationAlternativeNamesRead(id: number): __Observable<AlternativeName> {
    return this.locationAlternativeNamesReadResponse(id).pipe(
      __map(_r => _r.body as AlternativeName)
    );
  }

  /**
   * The City viewset.
   * @param params The `LocationService.LocationCitiesListParams` containing the following parameters:
   *
   * - `timezone`:
   *
   * - `subregion`:
   *
   * - `search`: A search term.
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `country`:
   *
   * - `by_name`:
   */
  locationCitiesListResponse(params: LocationService.LocationCitiesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<City>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.timezone != null) __params = __params.set('timezone', params.timezone.toString());
    if (params.subregion != null) __params = __params.set('subregion', params.subregion.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.region != null) __params = __params.set('region', params.region.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.country != null) __params = __params.set('country', params.country.toString());
    if (params.byName != null) __params = __params.set('by_name', params.byName.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/cities/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<City>}>;
      })
    );
  }
  /**
   * The City viewset.
   * @param params The `LocationService.LocationCitiesListParams` containing the following parameters:
   *
   * - `timezone`:
   *
   * - `subregion`:
   *
   * - `search`: A search term.
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `country`:
   *
   * - `by_name`:
   */
  locationCitiesList(params: LocationService.LocationCitiesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<City>}> {
    return this.locationCitiesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<City>})
    );
  }

  /**
   * The City viewset.
   * @param id A unique integer value identifying this city.
   */
  locationCitiesReadResponse(id: number): __Observable<__StrictHttpResponse<City>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/cities/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<City>;
      })
    );
  }
  /**
   * The City viewset.
   * @param id A unique integer value identifying this city.
   */
  locationCitiesRead(id: number): __Observable<City> {
    return this.locationCitiesReadResponse(id).pipe(
      __map(_r => _r.body as City)
    );
  }

  /**
   * The Continent viewset.
   * @param params The `LocationService.LocationContinentsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  locationContinentsListResponse(params: LocationService.LocationContinentsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Continent>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/continents/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Continent>}>;
      })
    );
  }
  /**
   * The Continent viewset.
   * @param params The `LocationService.LocationContinentsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  locationContinentsList(params: LocationService.LocationContinentsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Continent>}> {
    return this.locationContinentsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Continent>})
    );
  }

  /**
   * The Continent viewset.
   * @param id A unique integer value identifying this continent.
   */
  locationContinentsReadResponse(id: number): __Observable<__StrictHttpResponse<Continent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/continents/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Continent>;
      })
    );
  }
  /**
   * The Continent viewset.
   * @param id A unique integer value identifying this continent.
   */
  locationContinentsRead(id: number): __Observable<Continent> {
    return this.locationContinentsReadResponse(id).pipe(
      __map(_r => _r.body as Continent)
    );
  }

  /**
   * The Country viewset.
   * @param params The `LocationService.LocationCountriesListParams` containing the following parameters:
   *
   * - `tld`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `currency`:
   *
   * - `continent`:
   *
   * - `code3`:
   *
   * - `code`:
   */
  locationCountriesListResponse(params: LocationService.LocationCountriesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Country>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tld != null) __params = __params.set('tld', params.tld.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.currency != null) __params = __params.set('currency', params.currency.toString());
    if (params.continent != null) __params = __params.set('continent', params.continent.toString());
    if (params.code3 != null) __params = __params.set('code3', params.code3.toString());
    if (params.code != null) __params = __params.set('code', params.code.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/countries/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Country>}>;
      })
    );
  }
  /**
   * The Country viewset.
   * @param params The `LocationService.LocationCountriesListParams` containing the following parameters:
   *
   * - `tld`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `currency`:
   *
   * - `continent`:
   *
   * - `code3`:
   *
   * - `code`:
   */
  locationCountriesList(params: LocationService.LocationCountriesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Country>}> {
    return this.locationCountriesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Country>})
    );
  }

  /**
   * The Country viewset.
   * @param id A unique integer value identifying this country.
   */
  locationCountriesReadResponse(id: number): __Observable<__StrictHttpResponse<Country>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/countries/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Country>;
      })
    );
  }
  /**
   * The Country viewset.
   * @param id A unique integer value identifying this country.
   */
  locationCountriesRead(id: number): __Observable<Country> {
    return this.locationCountriesReadResponse(id).pipe(
      __map(_r => _r.body as Country)
    );
  }

  /**
   * The District viewset.
   * @param params The `LocationService.LocationDistrictsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `city`:
   */
  locationDistrictsListResponse(params: LocationService.LocationDistrictsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<District>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/districts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<District>}>;
      })
    );
  }
  /**
   * The District viewset.
   * @param params The `LocationService.LocationDistrictsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `city`:
   */
  locationDistrictsList(params: LocationService.LocationDistrictsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<District>}> {
    return this.locationDistrictsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<District>})
    );
  }

  /**
   * The District viewset.
   * @param id A unique integer value identifying this district.
   */
  locationDistrictsReadResponse(id: number): __Observable<__StrictHttpResponse<District>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/districts/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<District>;
      })
    );
  }
  /**
   * The District viewset.
   * @param id A unique integer value identifying this district.
   */
  locationDistrictsRead(id: number): __Observable<District> {
    return this.locationDistrictsReadResponse(id).pipe(
      __map(_r => _r.body as District)
    );
  }

  /**
   * Return a list of all languages.
   */
  locationLanguagesListResponse(): __Observable<__StrictHttpResponse<Array<Language>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/languages/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Language>>;
      })
    );
  }
  /**
   * Return a list of all languages.
   */
  locationLanguagesList(): __Observable<Array<Language>> {
    return this.locationLanguagesListResponse().pipe(
      __map(_r => _r.body as Array<Language>)
    );
  }

  /**
   * Return a language object.
   * @param id undefined
   */
  locationLanguagesReadResponse(id: string): __Observable<__StrictHttpResponse<Language>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/languages/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Language>;
      })
    );
  }
  /**
   * Return a language object.
   * @param id undefined
   */
  locationLanguagesRead(id: string): __Observable<Language> {
    return this.locationLanguagesReadResponse(id).pipe(
      __map(_r => _r.body as Language)
    );
  }

  /**
   * The PostalCode viewset.
   * @param params The `LocationService.LocationPostalCodesListParams` containing the following parameters:
   *
   * - `subregion`:
   *
   * - `search`: A search term.
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `district`:
   *
   * - `country`:
   *
   * - `city`:
   */
  locationPostalCodesListResponse(params: LocationService.LocationPostalCodesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PostalCode>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.subregion != null) __params = __params.set('subregion', params.subregion.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.region != null) __params = __params.set('region', params.region.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.district != null) __params = __params.set('district', params.district.toString());
    if (params.country != null) __params = __params.set('country', params.country.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/postal-codes/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PostalCode>}>;
      })
    );
  }
  /**
   * The PostalCode viewset.
   * @param params The `LocationService.LocationPostalCodesListParams` containing the following parameters:
   *
   * - `subregion`:
   *
   * - `search`: A search term.
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `district`:
   *
   * - `country`:
   *
   * - `city`:
   */
  locationPostalCodesList(params: LocationService.LocationPostalCodesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PostalCode>}> {
    return this.locationPostalCodesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PostalCode>})
    );
  }

  /**
   * The PostalCode viewset.
   * @param id A unique integer value identifying this postal code.
   */
  locationPostalCodesReadResponse(id: number): __Observable<__StrictHttpResponse<PostalCode>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/postal-codes/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PostalCode>;
      })
    );
  }
  /**
   * The PostalCode viewset.
   * @param id A unique integer value identifying this postal code.
   */
  locationPostalCodesRead(id: number): __Observable<PostalCode> {
    return this.locationPostalCodesReadResponse(id).pipe(
      __map(_r => _r.body as PostalCode)
    );
  }

  /**
   * The Region viewset.
   * @param params The `LocationService.LocationRegionsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `country`:
   *
   * - `code`:
   */
  locationRegionsListResponse(params: LocationService.LocationRegionsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Region>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.country != null) __params = __params.set('country', params.country.toString());
    if (params.code != null) __params = __params.set('code', params.code.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/regions/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Region>}>;
      })
    );
  }
  /**
   * The Region viewset.
   * @param params The `LocationService.LocationRegionsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `country`:
   *
   * - `code`:
   */
  locationRegionsList(params: LocationService.LocationRegionsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Region>}> {
    return this.locationRegionsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Region>})
    );
  }

  /**
   * The Region viewset.
   * @param id A unique integer value identifying this region.
   */
  locationRegionsReadResponse(id: number): __Observable<__StrictHttpResponse<Region>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/regions/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Region>;
      })
    );
  }
  /**
   * The Region viewset.
   * @param id A unique integer value identifying this region.
   */
  locationRegionsRead(id: number): __Observable<Region> {
    return this.locationRegionsReadResponse(id).pipe(
      __map(_r => _r.body as Region)
    );
  }

  /**
   * The Subregion viewset.
   * @param params The `LocationService.LocationSubregionsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `region__country`:
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  locationSubregionsListResponse(params: LocationService.LocationSubregionsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Subregion>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.regionCountry != null) __params = __params.set('region__country', params.regionCountry.toString());
    if (params.region != null) __params = __params.set('region', params.region.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/subregions/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Subregion>}>;
      })
    );
  }
  /**
   * The Subregion viewset.
   * @param params The `LocationService.LocationSubregionsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `region__country`:
   *
   * - `region`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  locationSubregionsList(params: LocationService.LocationSubregionsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Subregion>}> {
    return this.locationSubregionsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Subregion>})
    );
  }

  /**
   * The Subregion viewset.
   * @param id A unique integer value identifying this subregion.
   */
  locationSubregionsReadResponse(id: number): __Observable<__StrictHttpResponse<Subregion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/subregions/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Subregion>;
      })
    );
  }
  /**
   * The Subregion viewset.
   * @param id A unique integer value identifying this subregion.
   */
  locationSubregionsRead(id: number): __Observable<Subregion> {
    return this.locationSubregionsReadResponse(id).pipe(
      __map(_r => _r.body as Subregion)
    );
  }
}

module LocationService {

  /**
   * Parameters for locationAlternativeNamesList
   */
  export interface LocationAlternativeNamesListParams {

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
    languageCode?: string;
    kind?: string;
    isShort?: string;
    isPreferred?: string;
    isHistoric?: string;
    isColloquial?: string;
  }

  /**
   * Parameters for locationCitiesList
   */
  export interface LocationCitiesListParams {
    timezone?: string;
    subregion?: string;

    /**
     * A search term.
     */
    search?: string;
    region?: string;

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
    country?: string;
    byName?: string;
  }

  /**
   * Parameters for locationContinentsList
   */
  export interface LocationContinentsListParams {

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
  }

  /**
   * Parameters for locationCountriesList
   */
  export interface LocationCountriesListParams {
    tld?: string;

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
    currency?: string;
    continent?: number;
    code3?: string;
    code?: string;
  }

  /**
   * Parameters for locationDistrictsList
   */
  export interface LocationDistrictsListParams {

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
    city?: string;
  }

  /**
   * Parameters for locationPostalCodesList
   */
  export interface LocationPostalCodesListParams {
    subregion?: string;

    /**
     * A search term.
     */
    search?: string;
    region?: string;

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
    district?: string;
    country?: string;
    city?: string;
  }

  /**
   * Parameters for locationRegionsList
   */
  export interface LocationRegionsListParams {

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
    country?: number;
    code?: string;
  }

  /**
   * Parameters for locationSubregionsList
   */
  export interface LocationSubregionsListParams {

    /**
     * A search term.
     */
    search?: string;
    regionCountry?: number;
    region?: number;

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
  }
}

export { LocationService }
