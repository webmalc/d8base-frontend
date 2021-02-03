/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PaginatedResult } from '../models/paginated-result';
@Injectable({
  providedIn: 'root',
})
class SearchService extends __BaseService {
  static readonly searchListPath = '/search/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Return the professional calendar.
   * @param params The `SearchService.SearchListParams` containing the following parameters:
   *
   * - `tags`: multiple values may be separated by commas
   *
   * - `subregion`: subregion ID
   *
   * - `subcategories`: multiple subcategory IDs separated by commas
   *
   * - `start_price`: start price value (12.35)
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `start_age`: professional start age
   *
   * - `service_types`: multiple types may be separated by commas
   *
   * - `region`: region ID
   *
   * - `rating`: professional rating
   *
   * - `query`: search term query param
   *
   * - `professional_level`: professional level
   *
   * - `price_currency`: price currency (usd)
   *
   * - `postal_code`: postal code ID
   *
   * - `payment_methods`: multiple methods may be separated by commas
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `only_with_reviews`:
   *
   * - `only_with_photos`:
   *
   * - `only_with_fixed_price`:
   *
   * - `only_with_certificates`:
   *
   * - `only_with_auto_order_confirmation`:
   *
   * - `nationalities`: multiple country IDs may be separated by commas
   *
   * - `max_distance`: max distance
   *
   * - `longitude`: longitude (-79.3849)
   *
   * - `latitude`: latitude (43.6529)
   *
   * - `languages`: multiple values may be separated by commas
   *
   * - `gender`: male: 0,                 female: 1
   *
   * - `experience`: professional experience
   *
   * - `end_price`: end price value (16.50)
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `end_age`: professional end age
   *
   * - `district`: district ID
   *
   * - `country`: country ID
   *
   * - `city`: city ID
   *
   * - `categories`: multiple category IDs may be separated by commas
   */
  searchListResponse(params: SearchService.SearchListParams): __Observable<__StrictHttpResponse<PaginatedResult>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tags != null) __params = __params.set('tags', params.tags.toString());
    if (params.subregion != null) __params = __params.set('subregion', params.subregion.toString());
    if (params.subcategories != null) __params = __params.set('subcategories', params.subcategories.toString());
    if (params.startPrice != null) __params = __params.set('start_price', params.startPrice.toString());
    if (params.startDatetime != null) __params = __params.set('start_datetime', params.startDatetime.toString());
    if (params.startAge != null) __params = __params.set('start_age', params.startAge.toString());
    if (params.serviceTypes != null) __params = __params.set('service_types', params.serviceTypes.toString());
    if (params.region != null) __params = __params.set('region', params.region.toString());
    if (params.rating != null) __params = __params.set('rating', params.rating.toString());
    if (params.query != null) __params = __params.set('query', params.query.toString());
    if (params.professionalLevel != null) __params = __params.set('professional_level', params.professionalLevel.toString());
    if (params.priceCurrency != null) __params = __params.set('price_currency', params.priceCurrency.toString());
    if (params.postalCode != null) __params = __params.set('postal_code', params.postalCode.toString());
    if (params.paymentMethods != null) __params = __params.set('payment_methods', params.paymentMethods.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.onlyWithReviews != null) __params = __params.set('only_with_reviews', params.onlyWithReviews.toString());
    if (params.onlyWithPhotos != null) __params = __params.set('only_with_photos', params.onlyWithPhotos.toString());
    if (params.onlyWithFixedPrice != null) __params = __params.set('only_with_fixed_price', params.onlyWithFixedPrice.toString());
    if (params.onlyWithCertificates != null) __params = __params.set('only_with_certificates', params.onlyWithCertificates.toString());
    if (params.onlyWithAutoOrderConfirmation != null) __params = __params.set('only_with_auto_order_confirmation', params.onlyWithAutoOrderConfirmation.toString());
    if (params.nationalities != null) __params = __params.set('nationalities', params.nationalities.toString());
    if (params.maxDistance != null) __params = __params.set('max_distance', params.maxDistance.toString());
    if (params.longitude != null) __params = __params.set('longitude', params.longitude.toString());
    if (params.latitude != null) __params = __params.set('latitude', params.latitude.toString());
    if (params.languages != null) __params = __params.set('languages', params.languages.toString());
    if (params.gender != null) __params = __params.set('gender', params.gender.toString());
    if (params.experience != null) __params = __params.set('experience', params.experience.toString());
    if (params.endPrice != null) __params = __params.set('end_price', params.endPrice.toString());
    if (params.endDatetime != null) __params = __params.set('end_datetime', params.endDatetime.toString());
    if (params.endAge != null) __params = __params.set('end_age', params.endAge.toString());
    if (params.district != null) __params = __params.set('district', params.district.toString());
    if (params.country != null) __params = __params.set('country', params.country.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    if (params.categories != null) __params = __params.set('categories', params.categories.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/search/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaginatedResult>;
      })
    );
  }
  /**
   * Return the professional calendar.
   * @param params The `SearchService.SearchListParams` containing the following parameters:
   *
   * - `tags`: multiple values may be separated by commas
   *
   * - `subregion`: subregion ID
   *
   * - `subcategories`: multiple subcategory IDs separated by commas
   *
   * - `start_price`: start price value (12.35)
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `start_age`: professional start age
   *
   * - `service_types`: multiple types may be separated by commas
   *
   * - `region`: region ID
   *
   * - `rating`: professional rating
   *
   * - `query`: search term query param
   *
   * - `professional_level`: professional level
   *
   * - `price_currency`: price currency (usd)
   *
   * - `postal_code`: postal code ID
   *
   * - `payment_methods`: multiple methods may be separated by commas
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `only_with_reviews`:
   *
   * - `only_with_photos`:
   *
   * - `only_with_fixed_price`:
   *
   * - `only_with_certificates`:
   *
   * - `only_with_auto_order_confirmation`:
   *
   * - `nationalities`: multiple country IDs may be separated by commas
   *
   * - `max_distance`: max distance
   *
   * - `longitude`: longitude (-79.3849)
   *
   * - `latitude`: latitude (43.6529)
   *
   * - `languages`: multiple values may be separated by commas
   *
   * - `gender`: male: 0,                 female: 1
   *
   * - `experience`: professional experience
   *
   * - `end_price`: end price value (16.50)
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `end_age`: professional end age
   *
   * - `district`: district ID
   *
   * - `country`: country ID
   *
   * - `city`: city ID
   *
   * - `categories`: multiple category IDs may be separated by commas
   */
  searchList(params: SearchService.SearchListParams): __Observable<PaginatedResult> {
    return this.searchListResponse(params).pipe(
      __map(_r => _r.body as PaginatedResult)
    );
  }
}

module SearchService {

  /**
   * Parameters for searchList
   */
  export interface SearchListParams {

    /**
     * multiple values may be separated by commas
     */
    tags?: string;

    /**
     * subregion ID
     */
    subregion?: number;

    /**
     * multiple subcategory IDs separated by commas
     */
    subcategories?: string;

    /**
     * start price value (12.35)
     */
    startPrice?: string;

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    startDatetime?: string;

    /**
     * professional start age
     */
    startAge?: number;

    /**
     * multiple types may be separated by commas
     */
    serviceTypes?: string;

    /**
     * region ID
     */
    region?: number;

    /**
     * professional rating
     */
    rating?: number;

    /**
     * search term query param
     */
    query?: string;

    /**
     * professional level
     */
    professionalLevel?: 'junior' | 'middle' | 'senior';

    /**
     * price currency (usd)
     */
    priceCurrency?: string;

    /**
     * postal code ID
     */
    postalCode?: number;

    /**
     * multiple methods may be separated by commas
     */
    paymentMethods?: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
    onlyWithReviews?: boolean;
    onlyWithPhotos?: boolean;
    onlyWithFixedPrice?: boolean;
    onlyWithCertificates?: boolean;
    onlyWithAutoOrderConfirmation?: boolean;

    /**
     * multiple country IDs may be separated by commas
     */
    nationalities?: string;

    /**
     * max distance
     */
    maxDistance?: number;

    /**
     * longitude (-79.3849)
     */
    longitude?: string;

    /**
     * latitude (43.6529)
     */
    latitude?: string;

    /**
     * multiple values may be separated by commas
     */
    languages?: string;

    /**
     * male: 0,                 female: 1
     */
    gender?: 0 | 1;

    /**
     * professional experience
     */
    experience?: number;

    /**
     * end price value (16.50)
     */
    endPrice?: string;

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    endDatetime?: string;

    /**
     * professional end age
     */
    endAge?: number;

    /**
     * district ID
     */
    district?: number;

    /**
     * country ID
     */
    country?: number;

    /**
     * city ID
     */
    city?: number;

    /**
     * multiple category IDs may be separated by commas
     */
    categories?: string;
  }
}

export { SearchService }
