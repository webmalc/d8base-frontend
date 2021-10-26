/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Typeahead } from '../models/typeahead';
@Injectable({
  providedIn: 'root',
})
class TypeaheadService extends __BaseService {
  static readonly typeaheadListPath = '/typeahead/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get variants of needle.
   * @param params The `TypeaheadService.TypeaheadListParams` containing the following parameters:
   *
   * - `needle`: Search needle.
   *
   * - `limit`: Number of results.
   */
  typeaheadListResponse(params: TypeaheadService.TypeaheadListParams): __Observable<__StrictHttpResponse<Array<Typeahead>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.needle != null) __params = __params.set('needle', params.needle.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/typeahead/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Typeahead>>;
      })
    );
  }
  /**
   * Get variants of needle.
   * @param params The `TypeaheadService.TypeaheadListParams` containing the following parameters:
   *
   * - `needle`: Search needle.
   *
   * - `limit`: Number of results.
   */
  typeaheadList(params: TypeaheadService.TypeaheadListParams): __Observable<Array<Typeahead>> {
    return this.typeaheadListResponse(params).pipe(
      __map(_r => _r.body as Array<Typeahead>)
    );
  }
}

module TypeaheadService {

  /**
   * Parameters for typeaheadList
   */
  export interface TypeaheadListParams {

    /**
     * Search needle.
     */
    needle?: string;

    /**
     * Number of results.
     */
    limit?: string;
  }
}

export { TypeaheadService }
