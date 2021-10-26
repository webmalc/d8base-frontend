/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SentOrder } from '../models/sent-order';
@Injectable({
  providedIn: 'root',
})
class OrdersService extends __BaseService {
  static readonly ordersShareReadPath = '/orders/share/{id}/';
  static readonly ordersShareAssignToUserPath = '/orders/share/{id}/assign_to_user/';
  static readonly ordersShareIsAssignableToUserPath = '/orders/share/{id}/is_assignable_to_user/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * The orders shared with users viewset.
   * @param id A unique integer value identifying this order.
   */
  ordersShareReadResponse(id: number): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/orders/share/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentOrder>;
      })
    );
  }
  /**
   * The orders shared with users viewset.
   * @param id A unique integer value identifying this order.
   */
  ordersShareRead(id: number): __Observable<SentOrder> {
    return this.ordersShareReadResponse(id).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * Assign an order to a user.
   * @param params The `OrdersService.OrdersShareAssignToUserParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  ordersShareAssignToUserResponse(params: OrdersService.OrdersShareAssignToUserParams): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/orders/share/${encodeURIComponent(String(params.id))}/assign_to_user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentOrder>;
      })
    );
  }
  /**
   * Assign an order to a user.
   * @param params The `OrdersService.OrdersShareAssignToUserParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  ordersShareAssignToUser(params: OrdersService.OrdersShareAssignToUserParams): __Observable<SentOrder> {
    return this.ordersShareAssignToUserResponse(params).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * Check if it is possible to assign an order to a user.
   * @param id A unique integer value identifying this order.
   */
  ordersShareIsAssignableToUserResponse(id: number): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/orders/share/${encodeURIComponent(String(id))}/is_assignable_to_user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentOrder>;
      })
    );
  }
  /**
   * Check if it is possible to assign an order to a user.
   * @param id A unique integer value identifying this order.
   */
  ordersShareIsAssignableToUser(id: number): __Observable<SentOrder> {
    return this.ordersShareIsAssignableToUserResponse(id).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }
}

module OrdersService {

  /**
   * Parameters for ordersShareAssignToUser
   */
  export interface OrdersShareAssignToUserParams {

    /**
     * A unique integer value identifying this order.
     */
    id: number;
    data: SentOrder;
  }
}

export { OrdersService }
