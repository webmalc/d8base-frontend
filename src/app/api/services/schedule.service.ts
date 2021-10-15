/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProfessionalCalendar } from '../models/professional-calendar';
import { ProfessionalCalendarByDays } from '../models/professional-calendar-by-days';
@Injectable({
  providedIn: 'root',
})
class ScheduleService extends __BaseService {
  static readonly scheduleCalendarListPath = '/schedule/calendar/';
  static readonly scheduleCalendarDaysPath = '/schedule/calendar/days/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Return the professional calendar.
   * @param params The `ScheduleService.ScheduleCalendarListParams` containing the following parameters:
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `service`: service pk
   *
   * - `professional`: professional pk
   *
   * - `is_empty_entries`: Add empty entries to the result
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   */
  scheduleCalendarListResponse(params: ScheduleService.ScheduleCalendarListParams): __Observable<__StrictHttpResponse<Array<ProfessionalCalendar>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startDatetime != null) __params = __params.set('start_datetime', params.startDatetime.toString());
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.isEmptyEntries != null) __params = __params.set('is_empty_entries', params.isEmptyEntries.toString());
    if (params.endDatetime != null) __params = __params.set('end_datetime', params.endDatetime.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/schedule/calendar/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProfessionalCalendar>>;
      })
    );
  }
  /**
   * Return the professional calendar.
   * @param params The `ScheduleService.ScheduleCalendarListParams` containing the following parameters:
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `service`: service pk
   *
   * - `professional`: professional pk
   *
   * - `is_empty_entries`: Add empty entries to the result
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   */
  scheduleCalendarList(params: ScheduleService.ScheduleCalendarListParams): __Observable<Array<ProfessionalCalendar>> {
    return this.scheduleCalendarListResponse(params).pipe(
      __map(_r => _r.body as Array<ProfessionalCalendar>)
    );
  }

  /**
   * Return the professional calendar by months.
   * @param params The `ScheduleService.ScheduleCalendarDaysParams` containing the following parameters:
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `service`: service pk
   *
   * - `professional`: professional pk
   *
   * - `is_empty_entries`: Add empty entries to the result
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   */
  scheduleCalendarDaysResponse(params: ScheduleService.ScheduleCalendarDaysParams): __Observable<__StrictHttpResponse<Array<ProfessionalCalendarByDays>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startDatetime != null) __params = __params.set('start_datetime', params.startDatetime.toString());
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.isEmptyEntries != null) __params = __params.set('is_empty_entries', params.isEmptyEntries.toString());
    if (params.endDatetime != null) __params = __params.set('end_datetime', params.endDatetime.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/schedule/calendar/days/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProfessionalCalendarByDays>>;
      })
    );
  }
  /**
   * Return the professional calendar by months.
   * @param params The `ScheduleService.ScheduleCalendarDaysParams` containing the following parameters:
   *
   * - `start_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   *
   * - `service`: service pk
   *
   * - `professional`: professional pk
   *
   * - `is_empty_entries`: Add empty entries to the result
   *
   * - `end_datetime`: YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
   */
  scheduleCalendarDays(params: ScheduleService.ScheduleCalendarDaysParams): __Observable<Array<ProfessionalCalendarByDays>> {
    return this.scheduleCalendarDaysResponse(params).pipe(
      __map(_r => _r.body as Array<ProfessionalCalendarByDays>)
    );
  }
}

module ScheduleService {

  /**
   * Parameters for scheduleCalendarList
   */
  export interface ScheduleCalendarListParams {

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    startDatetime?: string;

    /**
     * service pk
     */
    service?: string;

    /**
     * professional pk
     */
    professional?: string;

    /**
     * Add empty entries to the result
     */
    isEmptyEntries?: boolean;

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    endDatetime?: string;
  }

  /**
   * Parameters for scheduleCalendarDays
   */
  export interface ScheduleCalendarDaysParams {

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    startDatetime?: string;

    /**
     * service pk
     */
    service?: string;

    /**
     * professional pk
     */
    professional?: string;

    /**
     * Add empty entries to the result
     */
    isEmptyEntries?: boolean;

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    endDatetime?: string;
  }
}

export { ScheduleService }
