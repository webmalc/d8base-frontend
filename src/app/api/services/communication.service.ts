/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GCMDevice } from '../models/gcmdevice';
import { Message } from '../models/message';
import { ReceivedMessage } from '../models/received-message';
import { SentMessage } from '../models/sent-message';
import { SuggestedMessage } from '../models/suggested-message';
import { ReviewList } from '../models/review-list';
@Injectable({
  providedIn: 'root',
})
class CommunicationService extends __BaseService {
  static readonly communicationDevicesFcmListPath = '/communication/devices/fcm/';
  static readonly communicationDevicesFcmCreatePath = '/communication/devices/fcm/';
  static readonly communicationDevicesFcmReadPath = '/communication/devices/fcm/{registration_id}/';
  static readonly communicationDevicesFcmUpdatePath = '/communication/devices/fcm/{registration_id}/';
  static readonly communicationDevicesFcmPartialUpdatePath = '/communication/devices/fcm/{registration_id}/';
  static readonly communicationDevicesFcmDeletePath = '/communication/devices/fcm/{registration_id}/';
  static readonly communicationMessagesLatestListPath = '/communication/messages/latest/';
  static readonly communicationMessagesListListPath = '/communication/messages/list/';
  static readonly communicationMessagesListReadPath = '/communication/messages/list/{id}/';
  static readonly communicationMessagesReceivedListPath = '/communication/messages/received/';
  static readonly communicationMessagesReceivedReadPath = '/communication/messages/received/{id}/';
  static readonly communicationMessagesReceivedDeletePath = '/communication/messages/received/{id}/';
  static readonly communicationMessagesSentListPath = '/communication/messages/sent/';
  static readonly communicationMessagesSentCreatePath = '/communication/messages/sent/';
  static readonly communicationMessagesSentReadPath = '/communication/messages/sent/{id}/';
  static readonly communicationMessagesSentUpdatePath = '/communication/messages/sent/{id}/';
  static readonly communicationMessagesSentPartialUpdatePath = '/communication/messages/sent/{id}/';
  static readonly communicationMessagesSentDeletePath = '/communication/messages/sent/{id}/';
  static readonly communicationMessagesSuggestedListPath = '/communication/messages/suggested/';
  static readonly communicationMessagesSuggestedReadPath = '/communication/messages/suggested/{id}/';
  static readonly communicationReviewsListPath = '/communication/reviews/';
  static readonly communicationReviewsReadPath = '/communication/reviews/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  communicationDevicesFcmListResponse(params: CommunicationService.CommunicationDevicesFcmListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<GCMDevice>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/devices/fcm/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<GCMDevice>}>;
      })
    );
  }
  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  communicationDevicesFcmList(params: CommunicationService.CommunicationDevicesFcmListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<GCMDevice>}> {
    return this.communicationDevicesFcmListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<GCMDevice>})
    );
  }

  /**
   * @param data undefined
   */
  communicationDevicesFcmCreateResponse(data: GCMDevice): __Observable<__StrictHttpResponse<GCMDevice>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/communication/devices/fcm/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GCMDevice>;
      })
    );
  }
  /**
   * @param data undefined
   */
  communicationDevicesFcmCreate(data: GCMDevice): __Observable<GCMDevice> {
    return this.communicationDevicesFcmCreateResponse(data).pipe(
      __map(_r => _r.body as GCMDevice)
    );
  }

  /**
   * @param registration_id undefined
   */
  communicationDevicesFcmReadResponse(registrationId: string): __Observable<__StrictHttpResponse<GCMDevice>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/devices/fcm/${encodeURIComponent(registrationId)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GCMDevice>;
      })
    );
  }
  /**
   * @param registration_id undefined
   */
  communicationDevicesFcmRead(registrationId: string): __Observable<GCMDevice> {
    return this.communicationDevicesFcmReadResponse(registrationId).pipe(
      __map(_r => _r.body as GCMDevice)
    );
  }

  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmUpdateParams` containing the following parameters:
   *
   * - `registration_id`:
   *
   * - `data`:
   */
  communicationDevicesFcmUpdateResponse(params: CommunicationService.CommunicationDevicesFcmUpdateParams): __Observable<__StrictHttpResponse<GCMDevice>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/communication/devices/fcm/${encodeURIComponent(params.registrationId)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GCMDevice>;
      })
    );
  }
  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmUpdateParams` containing the following parameters:
   *
   * - `registration_id`:
   *
   * - `data`:
   */
  communicationDevicesFcmUpdate(params: CommunicationService.CommunicationDevicesFcmUpdateParams): __Observable<GCMDevice> {
    return this.communicationDevicesFcmUpdateResponse(params).pipe(
      __map(_r => _r.body as GCMDevice)
    );
  }

  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmPartialUpdateParams` containing the following parameters:
   *
   * - `registration_id`:
   *
   * - `data`:
   */
  communicationDevicesFcmPartialUpdateResponse(params: CommunicationService.CommunicationDevicesFcmPartialUpdateParams): __Observable<__StrictHttpResponse<GCMDevice>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/communication/devices/fcm/${encodeURIComponent(params.registrationId)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GCMDevice>;
      })
    );
  }
  /**
   * @param params The `CommunicationService.CommunicationDevicesFcmPartialUpdateParams` containing the following parameters:
   *
   * - `registration_id`:
   *
   * - `data`:
   */
  communicationDevicesFcmPartialUpdate(params: CommunicationService.CommunicationDevicesFcmPartialUpdateParams): __Observable<GCMDevice> {
    return this.communicationDevicesFcmPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as GCMDevice)
    );
  }

  /**
   * @param registration_id undefined
   */
  communicationDevicesFcmDeleteResponse(registrationId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/communication/devices/fcm/${encodeURIComponent(registrationId)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param registration_id undefined
   */
  communicationDevicesFcmDelete(registrationId: string): __Observable<null> {
    return this.communicationDevicesFcmDeleteResponse(registrationId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get a list.
   */
  communicationMessagesLatestListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/latest/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Get a list.
   */
  communicationMessagesLatestList(): __Observable<null> {
    return this.communicationMessagesLatestListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The readonly messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesListListParams` containing the following parameters:
   *
   * - `sender`:
   *
   * - `search`: A search term.
   *
   * - `recipient`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   *
   * - `interlocutor`:
   */
  communicationMessagesListListResponse(params: CommunicationService.CommunicationMessagesListListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Message>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sender != null) __params = __params.set('sender', params.sender.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.recipient != null) __params = __params.set('recipient', params.recipient.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isRead != null) __params = __params.set('is_read', params.isRead.toString());
    if (params.interlocutor != null) __params = __params.set('interlocutor', params.interlocutor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/list/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Message>}>;
      })
    );
  }
  /**
   * The readonly messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesListListParams` containing the following parameters:
   *
   * - `sender`:
   *
   * - `search`: A search term.
   *
   * - `recipient`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   *
   * - `interlocutor`:
   */
  communicationMessagesListList(params: CommunicationService.CommunicationMessagesListListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Message>}> {
    return this.communicationMessagesListListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Message>})
    );
  }

  /**
   * The readonly messages viewset.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesListReadResponse(id: number): __Observable<__StrictHttpResponse<Message>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/list/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Message>;
      })
    );
  }
  /**
   * The readonly messages viewset.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesListRead(id: number): __Observable<Message> {
    return this.communicationMessagesListReadResponse(id).pipe(
      __map(_r => _r.body as Message)
    );
  }

  /**
   * The received messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesReceivedListParams` containing the following parameters:
   *
   * - `sender`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   */
  communicationMessagesReceivedListResponse(params: CommunicationService.CommunicationMessagesReceivedListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedMessage>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sender != null) __params = __params.set('sender', params.sender.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isRead != null) __params = __params.set('is_read', params.isRead.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/received/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedMessage>}>;
      })
    );
  }
  /**
   * The received messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesReceivedListParams` containing the following parameters:
   *
   * - `sender`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   */
  communicationMessagesReceivedList(params: CommunicationService.CommunicationMessagesReceivedListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedMessage>}> {
    return this.communicationMessagesReceivedListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ReceivedMessage>})
    );
  }

  /**
   * Get the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesReceivedReadResponse(id: number): __Observable<__StrictHttpResponse<ReceivedMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/received/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReceivedMessage>;
      })
    );
  }
  /**
   * Get the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesReceivedRead(id: number): __Observable<ReceivedMessage> {
    return this.communicationMessagesReceivedReadResponse(id).pipe(
      __map(_r => _r.body as ReceivedMessage)
    );
  }

  /**
   * Delete the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesReceivedDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/communication/messages/received/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesReceivedDelete(id: number): __Observable<null> {
    return this.communicationMessagesReceivedDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The sent messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesSentListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `recipient`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   */
  communicationMessagesSentListResponse(params: CommunicationService.CommunicationMessagesSentListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SentMessage>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.recipient != null) __params = __params.set('recipient', params.recipient.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isRead != null) __params = __params.set('is_read', params.isRead.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/sent/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SentMessage>}>;
      })
    );
  }
  /**
   * The sent messages viewset.
   * @param params The `CommunicationService.CommunicationMessagesSentListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `recipient`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_read`:
   */
  communicationMessagesSentList(params: CommunicationService.CommunicationMessagesSentListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<SentMessage>}> {
    return this.communicationMessagesSentListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<SentMessage>})
    );
  }

  /**
   * The sent messages viewset.
   * @param data undefined
   */
  communicationMessagesSentCreateResponse(data: SentMessage): __Observable<__StrictHttpResponse<SentMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/communication/messages/sent/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentMessage>;
      })
    );
  }
  /**
   * The sent messages viewset.
   * @param data undefined
   */
  communicationMessagesSentCreate(data: SentMessage): __Observable<SentMessage> {
    return this.communicationMessagesSentCreateResponse(data).pipe(
      __map(_r => _r.body as SentMessage)
    );
  }

  /**
   * The sent messages viewset.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesSentReadResponse(id: number): __Observable<__StrictHttpResponse<SentMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/sent/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentMessage>;
      })
    );
  }
  /**
   * The sent messages viewset.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesSentRead(id: number): __Observable<SentMessage> {
    return this.communicationMessagesSentReadResponse(id).pipe(
      __map(_r => _r.body as SentMessage)
    );
  }

  /**
   * Update the object.
   * @param params The `CommunicationService.CommunicationMessagesSentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this message.
   *
   * - `data`:
   */
  communicationMessagesSentUpdateResponse(params: CommunicationService.CommunicationMessagesSentUpdateParams): __Observable<__StrictHttpResponse<SentMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/communication/messages/sent/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentMessage>;
      })
    );
  }
  /**
   * Update the object.
   * @param params The `CommunicationService.CommunicationMessagesSentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this message.
   *
   * - `data`:
   */
  communicationMessagesSentUpdate(params: CommunicationService.CommunicationMessagesSentUpdateParams): __Observable<SentMessage> {
    return this.communicationMessagesSentUpdateResponse(params).pipe(
      __map(_r => _r.body as SentMessage)
    );
  }

  /**
   * Partial update the object.
   * @param params The `CommunicationService.CommunicationMessagesSentPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this message.
   *
   * - `data`:
   */
  communicationMessagesSentPartialUpdateResponse(params: CommunicationService.CommunicationMessagesSentPartialUpdateParams): __Observable<__StrictHttpResponse<SentMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/communication/messages/sent/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SentMessage>;
      })
    );
  }
  /**
   * Partial update the object.
   * @param params The `CommunicationService.CommunicationMessagesSentPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this message.
   *
   * - `data`:
   */
  communicationMessagesSentPartialUpdate(params: CommunicationService.CommunicationMessagesSentPartialUpdateParams): __Observable<SentMessage> {
    return this.communicationMessagesSentPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as SentMessage)
    );
  }

  /**
   * Delete the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesSentDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/communication/messages/sent/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete the object.
   * @param id A unique integer value identifying this message.
   */
  communicationMessagesSentDelete(id: number): __Observable<null> {
    return this.communicationMessagesSentDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The suggested answer viewset.
   * @param params The `CommunicationService.CommunicationMessagesSuggestedListParams` containing the following parameters:
   *
   * - `subcategory`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   */
  communicationMessagesSuggestedListResponse(params: CommunicationService.CommunicationMessagesSuggestedListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SuggestedMessage>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.subcategory != null) __params = __params.set('subcategory', params.subcategory.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/suggested/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SuggestedMessage>}>;
      })
    );
  }
  /**
   * The suggested answer viewset.
   * @param params The `CommunicationService.CommunicationMessagesSuggestedListParams` containing the following parameters:
   *
   * - `subcategory`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   */
  communicationMessagesSuggestedList(params: CommunicationService.CommunicationMessagesSuggestedListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<SuggestedMessage>}> {
    return this.communicationMessagesSuggestedListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<SuggestedMessage>})
    );
  }

  /**
   * The suggested answer viewset.
   * @param id A unique integer value identifying this suggested message.
   */
  communicationMessagesSuggestedReadResponse(id: number): __Observable<__StrictHttpResponse<SuggestedMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/messages/suggested/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SuggestedMessage>;
      })
    );
  }
  /**
   * The suggested answer viewset.
   * @param id A unique integer value identifying this suggested message.
   */
  communicationMessagesSuggestedRead(id: number): __Observable<SuggestedMessage> {
    return this.communicationMessagesSuggestedReadResponse(id).pipe(
      __map(_r => _r.body as SuggestedMessage)
    );
  }

  /**
   * The review list viewset.
   * @param params The `CommunicationService.CommunicationReviewsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `rating`:
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `modified`:
   *
   * - `created`:
   */
  communicationReviewsListResponse(params: CommunicationService.CommunicationReviewsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.rating != null) __params = __params.set('rating', params.rating.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.modified != null) __params = __params.set('modified', params.modified.toString());
    if (params.created != null) __params = __params.set('created', params.created.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/reviews/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewList>}>;
      })
    );
  }
  /**
   * The review list viewset.
   * @param params The `CommunicationService.CommunicationReviewsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `rating`:
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `modified`:
   *
   * - `created`:
   */
  communicationReviewsList(params: CommunicationService.CommunicationReviewsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewList>}> {
    return this.communicationReviewsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ReviewList>})
    );
  }

  /**
   * The review list viewset.
   * @param id A unique integer value identifying this review.
   */
  communicationReviewsReadResponse(id: number): __Observable<__StrictHttpResponse<ReviewList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/communication/reviews/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewList>;
      })
    );
  }
  /**
   * The review list viewset.
   * @param id A unique integer value identifying this review.
   */
  communicationReviewsRead(id: number): __Observable<ReviewList> {
    return this.communicationReviewsReadResponse(id).pipe(
      __map(_r => _r.body as ReviewList)
    );
  }
}

module CommunicationService {

  /**
   * Parameters for communicationDevicesFcmList
   */
  export interface CommunicationDevicesFcmListParams {

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
   * Parameters for communicationDevicesFcmUpdate
   */
  export interface CommunicationDevicesFcmUpdateParams {
    registrationId: string;
    data: GCMDevice;
  }

  /**
   * Parameters for communicationDevicesFcmPartialUpdate
   */
  export interface CommunicationDevicesFcmPartialUpdateParams {
    registrationId: string;
    data: GCMDevice;
  }

  /**
   * Parameters for communicationMessagesListList
   */
  export interface CommunicationMessagesListListParams {
    sender?: number;

    /**
     * A search term.
     */
    search?: string;
    recipient?: number;

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
    isRead?: string;
    interlocutor?: number;
  }

  /**
   * Parameters for communicationMessagesReceivedList
   */
  export interface CommunicationMessagesReceivedListParams {
    sender?: number;

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
    isRead?: string;
  }

  /**
   * Parameters for communicationMessagesSentList
   */
  export interface CommunicationMessagesSentListParams {

    /**
     * A search term.
     */
    search?: string;
    recipient?: number;

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
    isRead?: string;
  }

  /**
   * Parameters for communicationMessagesSentUpdate
   */
  export interface CommunicationMessagesSentUpdateParams {

    /**
     * A unique integer value identifying this message.
     */
    id: number;
    data: SentMessage;
  }

  /**
   * Parameters for communicationMessagesSentPartialUpdate
   */
  export interface CommunicationMessagesSentPartialUpdateParams {

    /**
     * A unique integer value identifying this message.
     */
    id: number;
    data: SentMessage;
  }

  /**
   * Parameters for communicationMessagesSuggestedList
   */
  export interface CommunicationMessagesSuggestedListParams {
    subcategory?: number;

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
    isEnabled?: string;
  }

  /**
   * Parameters for communicationReviewsList
   */
  export interface CommunicationReviewsListParams {

    /**
     * A search term.
     */
    search?: string;
    rating?: string;
    professional?: number;

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
    modified?: string;
    created?: string;
  }
}

export { CommunicationService }
