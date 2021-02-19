/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Rate } from '../models/rate';
@Injectable({
  providedIn: 'root',
})
class RatesService extends __BaseService {
  static readonly ratesListPath = '/rates/';
  static readonly ratesReadPath = '/rates/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * The rate viewset.
   * @param params The `RatesService.RatesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `currency`:
   */
  ratesListResponse(params: RatesService.RatesListParams): __Observable<__StrictHttpResponse<Array<Rate>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.currency != null) __params = __params.set('currency', params.currency.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rates/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Rate>>;
      })
    );
  }
  /**
   * The rate viewset.
   * @param params The `RatesService.RatesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `currency`:
   */
  ratesList(params: RatesService.RatesListParams): __Observable<Array<Rate>> {
    return this.ratesListResponse(params).pipe(
      __map(_r => _r.body as Array<Rate>)
    );
  }

  /**
   * The rate viewset.
   * @param id A unique integer value identifying this rate.
   */
  ratesReadResponse(id: number): __Observable<__StrictHttpResponse<Rate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rates/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rate>;
      })
    );
  }
  /**
   * The rate viewset.
   * @param id A unique integer value identifying this rate.
   */
  ratesRead(id: number): __Observable<Rate> {
    return this.ratesReadResponse(id).pipe(
      __map(_r => _r.body as Rate)
    );
  }
}

module RatesService {

  /**
   * Parameters for ratesList
   */
  export interface RatesListParams {

    /**
     * A search term.
     */
    search?: string;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;
    currency?: string;
  }
}

export { RatesService }
