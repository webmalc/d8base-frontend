/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ChangePassword } from '../models/change-password';
import { UserContact } from '../models/user-contact';
import { UserLanguage } from '../models/user-language';
import { UserLocation } from '../models/user-location';
import { OrderReminder } from '../models/order-reminder';
import { ReceivedOrder } from '../models/received-order';
import { SentOrder } from '../models/sent-order';
import { ProfessionalCertificate } from '../models/professional-certificate';
import { ProfessionalClosedPeriod } from '../models/professional-closed-period';
import { ProfessionalContact } from '../models/professional-contact';
import { ProfessionalEducation } from '../models/professional-education';
import { ProfessionalExperience } from '../models/professional-experience';
import { ProfessionalLocation } from '../models/professional-location';
import { ProfessionalPhoto } from '../models/professional-photo';
import { ProfessionalSchedulePeriod } from '../models/professional-schedule-period';
import { ProfessionalSchedule } from '../models/professional-schedule';
import { ProfessionalTag } from '../models/professional-tag';
import { Professional } from '../models/professional';
import { Profile } from '../models/profile';
import { DefaultRegisterEmail } from '../models/default-register-email';
import { DefaultRegisterUser } from '../models/default-register-user';
import { ResetPassword } from '../models/reset-password';
import { ReviewComment } from '../models/review-comment';
import { Review } from '../models/review';
import { UserSavedProfessional } from '../models/user-saved-professional';
import { DefaultSendResetPasswordLink } from '../models/default-send-reset-password-link';
import { ServiceClosedPeriod } from '../models/service-closed-period';
import { ServiceLocation } from '../models/service-location';
import { ServicePhoto } from '../models/service-photo';
import { Price } from '../models/price';
import { ServiceSchedulePeriod } from '../models/service-schedule-period';
import { ServiceSchedule } from '../models/service-schedule';
import { ServiceTag } from '../models/service-tag';
import { Service } from '../models/service';
import { UserSettings } from '../models/user-settings';
import { VerifyEmail } from '../models/verify-email';
import { VerifyRegistration } from '../models/verify-registration';
@Injectable({
  providedIn: 'root',
})
class AccountsService extends __BaseService {
  static readonly accountsChangePasswordCreatePath = '/accounts/change-password/';
  static readonly accountsContactsListPath = '/accounts/contacts/';
  static readonly accountsContactsCreatePath = '/accounts/contacts/';
  static readonly accountsContactsReadPath = '/accounts/contacts/{id}/';
  static readonly accountsContactsUpdatePath = '/accounts/contacts/{id}/';
  static readonly accountsContactsPartialUpdatePath = '/accounts/contacts/{id}/';
  static readonly accountsContactsDeletePath = '/accounts/contacts/{id}/';
  static readonly accountsIsUserRegisteredCreatePath = '/accounts/is-user-registered';
  static readonly accountsLanguagesListPath = '/accounts/languages/';
  static readonly accountsLanguagesCreatePath = '/accounts/languages/';
  static readonly accountsLanguagesReadPath = '/accounts/languages/{id}/';
  static readonly accountsLanguagesUpdatePath = '/accounts/languages/{id}/';
  static readonly accountsLanguagesPartialUpdatePath = '/accounts/languages/{id}/';
  static readonly accountsLanguagesDeletePath = '/accounts/languages/{id}/';
  static readonly accountsLocationsListPath = '/accounts/locations/';
  static readonly accountsLocationsCreatePath = '/accounts/locations/';
  static readonly accountsLocationsReadPath = '/accounts/locations/{id}/';
  static readonly accountsLocationsUpdatePath = '/accounts/locations/{id}/';
  static readonly accountsLocationsPartialUpdatePath = '/accounts/locations/{id}/';
  static readonly accountsLocationsDeletePath = '/accounts/locations/{id}/';
  static readonly accountsOrderRemindersListPath = '/accounts/order-reminders/';
  static readonly accountsOrderRemindersCreatePath = '/accounts/order-reminders/';
  static readonly accountsOrderRemindersReadPath = '/accounts/order-reminders/{id}/';
  static readonly accountsOrderRemindersUpdatePath = '/accounts/order-reminders/{id}/';
  static readonly accountsOrderRemindersPartialUpdatePath = '/accounts/order-reminders/{id}/';
  static readonly accountsOrderRemindersDeletePath = '/accounts/order-reminders/{id}/';
  static readonly accountsOrdersReceivedListPath = '/accounts/orders/received/';
  static readonly accountsOrdersReceivedReadPath = '/accounts/orders/received/{id}/';
  static readonly accountsOrdersReceivedUpdatePath = '/accounts/orders/received/{id}/';
  static readonly accountsOrdersReceivedPartialUpdatePath = '/accounts/orders/received/{id}/';
  static readonly accountsOrdersSentListPath = '/accounts/orders/sent/';
  static readonly accountsOrdersSentCreatePath = '/accounts/orders/sent/';
  static readonly accountsOrdersSentReadPath = '/accounts/orders/sent/{id}/';
  static readonly accountsOrdersSentUpdatePath = '/accounts/orders/sent/{id}/';
  static readonly accountsOrdersSentPartialUpdatePath = '/accounts/orders/sent/{id}/';
  static readonly accountsProfessionalCertificatesListPath = '/accounts/professional-certificates/';
  static readonly accountsProfessionalCertificatesCreatePath = '/accounts/professional-certificates/';
  static readonly accountsProfessionalCertificatesReadPath = '/accounts/professional-certificates/{id}/';
  static readonly accountsProfessionalCertificatesUpdatePath = '/accounts/professional-certificates/{id}/';
  static readonly accountsProfessionalCertificatesPartialUpdatePath = '/accounts/professional-certificates/{id}/';
  static readonly accountsProfessionalCertificatesDeletePath = '/accounts/professional-certificates/{id}/';
  static readonly accountsProfessionalClosedPeriodsListPath = '/accounts/professional-closed-periods/';
  static readonly accountsProfessionalClosedPeriodsCreatePath = '/accounts/professional-closed-periods/';
  static readonly accountsProfessionalClosedPeriodsReadPath = '/accounts/professional-closed-periods/{id}/';
  static readonly accountsProfessionalClosedPeriodsUpdatePath = '/accounts/professional-closed-periods/{id}/';
  static readonly accountsProfessionalClosedPeriodsPartialUpdatePath = '/accounts/professional-closed-periods/{id}/';
  static readonly accountsProfessionalClosedPeriodsDeletePath = '/accounts/professional-closed-periods/{id}/';
  static readonly accountsProfessionalContactsListPath = '/accounts/professional-contacts/';
  static readonly accountsProfessionalContactsCreatePath = '/accounts/professional-contacts/';
  static readonly accountsProfessionalContactsReadPath = '/accounts/professional-contacts/{id}/';
  static readonly accountsProfessionalContactsUpdatePath = '/accounts/professional-contacts/{id}/';
  static readonly accountsProfessionalContactsPartialUpdatePath = '/accounts/professional-contacts/{id}/';
  static readonly accountsProfessionalContactsDeletePath = '/accounts/professional-contacts/{id}/';
  static readonly accountsProfessionalEducationsListPath = '/accounts/professional-educations/';
  static readonly accountsProfessionalEducationsCreatePath = '/accounts/professional-educations/';
  static readonly accountsProfessionalEducationsReadPath = '/accounts/professional-educations/{id}/';
  static readonly accountsProfessionalEducationsUpdatePath = '/accounts/professional-educations/{id}/';
  static readonly accountsProfessionalEducationsPartialUpdatePath = '/accounts/professional-educations/{id}/';
  static readonly accountsProfessionalEducationsDeletePath = '/accounts/professional-educations/{id}/';
  static readonly accountsProfessionalExperienceListPath = '/accounts/professional-experience/';
  static readonly accountsProfessionalExperienceCreatePath = '/accounts/professional-experience/';
  static readonly accountsProfessionalExperienceReadPath = '/accounts/professional-experience/{id}/';
  static readonly accountsProfessionalExperienceUpdatePath = '/accounts/professional-experience/{id}/';
  static readonly accountsProfessionalExperiencePartialUpdatePath = '/accounts/professional-experience/{id}/';
  static readonly accountsProfessionalExperienceDeletePath = '/accounts/professional-experience/{id}/';
  static readonly accountsProfessionalLocationsListPath = '/accounts/professional-locations/';
  static readonly accountsProfessionalLocationsCreatePath = '/accounts/professional-locations/';
  static readonly accountsProfessionalLocationsReadPath = '/accounts/professional-locations/{id}/';
  static readonly accountsProfessionalLocationsUpdatePath = '/accounts/professional-locations/{id}/';
  static readonly accountsProfessionalLocationsPartialUpdatePath = '/accounts/professional-locations/{id}/';
  static readonly accountsProfessionalLocationsDeletePath = '/accounts/professional-locations/{id}/';
  static readonly accountsProfessionalPhotosListPath = '/accounts/professional-photos/';
  static readonly accountsProfessionalPhotosCreatePath = '/accounts/professional-photos/';
  static readonly accountsProfessionalPhotosReadPath = '/accounts/professional-photos/{id}/';
  static readonly accountsProfessionalPhotosUpdatePath = '/accounts/professional-photos/{id}/';
  static readonly accountsProfessionalPhotosPartialUpdatePath = '/accounts/professional-photos/{id}/';
  static readonly accountsProfessionalPhotosDeletePath = '/accounts/professional-photos/{id}/';
  static readonly accountsProfessionalSchedulePeriodsListPath = '/accounts/professional-schedule-periods/';
  static readonly accountsProfessionalSchedulePeriodsCreatePath = '/accounts/professional-schedule-periods/';
  static readonly accountsProfessionalSchedulePeriodsReadPath = '/accounts/professional-schedule-periods/{id}/';
  static readonly accountsProfessionalSchedulePeriodsUpdatePath = '/accounts/professional-schedule-periods/{id}/';
  static readonly accountsProfessionalSchedulePeriodsPartialUpdatePath = '/accounts/professional-schedule-periods/{id}/';
  static readonly accountsProfessionalSchedulePeriodsDeletePath = '/accounts/professional-schedule-periods/{id}/';
  static readonly accountsProfessionalScheduleListPath = '/accounts/professional-schedule/';
  static readonly accountsProfessionalScheduleCreatePath = '/accounts/professional-schedule/';
  static readonly accountsProfessionalScheduleSetPath = '/accounts/professional-schedule/set/';
  static readonly accountsProfessionalScheduleReadPath = '/accounts/professional-schedule/{id}/';
  static readonly accountsProfessionalScheduleUpdatePath = '/accounts/professional-schedule/{id}/';
  static readonly accountsProfessionalSchedulePartialUpdatePath = '/accounts/professional-schedule/{id}/';
  static readonly accountsProfessionalScheduleDeletePath = '/accounts/professional-schedule/{id}/';
  static readonly accountsProfessionalTagsListPath = '/accounts/professional-tags/';
  static readonly accountsProfessionalTagsCreatePath = '/accounts/professional-tags/';
  static readonly accountsProfessionalTagsReadPath = '/accounts/professional-tags/{id}/';
  static readonly accountsProfessionalTagsUpdatePath = '/accounts/professional-tags/{id}/';
  static readonly accountsProfessionalTagsPartialUpdatePath = '/accounts/professional-tags/{id}/';
  static readonly accountsProfessionalTagsDeletePath = '/accounts/professional-tags/{id}/';
  static readonly accountsProfessionalsListPath = '/accounts/professionals/';
  static readonly accountsProfessionalsCreatePath = '/accounts/professionals/';
  static readonly accountsProfessionalsCanReviewReadPath = '/accounts/professionals/can-review/{id}/';
  static readonly accountsProfessionalsReadPath = '/accounts/professionals/{id}/';
  static readonly accountsProfessionalsUpdatePath = '/accounts/professionals/{id}/';
  static readonly accountsProfessionalsPartialUpdatePath = '/accounts/professionals/{id}/';
  static readonly accountsProfessionalsDeletePath = '/accounts/professionals/{id}/';
  static readonly accountsProfessionalsGenerateCalendarPath = '/accounts/professionals/{id}/generate_calendar/';
  static readonly accountsProfileListPath = '/accounts/profile/';
  static readonly accountsProfileCreatePath = '/accounts/profile/';
  static readonly accountsProfileUpdatePath = '/accounts/profile/';
  static readonly accountsProfilePartialUpdatePath = '/accounts/profile/';
  static readonly accountsRegisterEmailCreatePath = '/accounts/register-email/';
  static readonly accountsRegisterCreatePath = '/accounts/register/';
  static readonly accountsResendVerifyRegistrationCreatePath = '/accounts/resend-verify-registration';
  static readonly accountsResetPasswordCreatePath = '/accounts/reset-password/';
  static readonly accountsReviewCommentsListPath = '/accounts/review-comments/';
  static readonly accountsReviewCommentsCreatePath = '/accounts/review-comments/';
  static readonly accountsReviewCommentsReadPath = '/accounts/review-comments/{id}/';
  static readonly accountsReviewCommentsUpdatePath = '/accounts/review-comments/{id}/';
  static readonly accountsReviewCommentsPartialUpdatePath = '/accounts/review-comments/{id}/';
  static readonly accountsReviewCommentsDeletePath = '/accounts/review-comments/{id}/';
  static readonly accountsReviewsListPath = '/accounts/reviews/';
  static readonly accountsReviewsCreatePath = '/accounts/reviews/';
  static readonly accountsReviewsReadPath = '/accounts/reviews/{id}/';
  static readonly accountsReviewsUpdatePath = '/accounts/reviews/{id}/';
  static readonly accountsReviewsPartialUpdatePath = '/accounts/reviews/{id}/';
  static readonly accountsReviewsDeletePath = '/accounts/reviews/{id}/';
  static readonly accountsSavedProfessionalsListPath = '/accounts/saved-professionals/';
  static readonly accountsSavedProfessionalsCreatePath = '/accounts/saved-professionals/';
  static readonly accountsSavedProfessionalsReadPath = '/accounts/saved-professionals/{id}/';
  static readonly accountsSavedProfessionalsUpdatePath = '/accounts/saved-professionals/{id}/';
  static readonly accountsSavedProfessionalsPartialUpdatePath = '/accounts/saved-professionals/{id}/';
  static readonly accountsSavedProfessionalsDeletePath = '/accounts/saved-professionals/{id}/';
  static readonly accountsSendResetPasswordLinkCreatePath = '/accounts/send-reset-password-link/';
  static readonly accountsServiceClosedPeriodsListPath = '/accounts/service-closed-periods/';
  static readonly accountsServiceClosedPeriodsCreatePath = '/accounts/service-closed-periods/';
  static readonly accountsServiceClosedPeriodsReadPath = '/accounts/service-closed-periods/{id}/';
  static readonly accountsServiceClosedPeriodsUpdatePath = '/accounts/service-closed-periods/{id}/';
  static readonly accountsServiceClosedPeriodsPartialUpdatePath = '/accounts/service-closed-periods/{id}/';
  static readonly accountsServiceClosedPeriodsDeletePath = '/accounts/service-closed-periods/{id}/';
  static readonly accountsServiceLocationsListPath = '/accounts/service-locations/';
  static readonly accountsServiceLocationsCreatePath = '/accounts/service-locations/';
  static readonly accountsServiceLocationsReadPath = '/accounts/service-locations/{id}/';
  static readonly accountsServiceLocationsUpdatePath = '/accounts/service-locations/{id}/';
  static readonly accountsServiceLocationsPartialUpdatePath = '/accounts/service-locations/{id}/';
  static readonly accountsServiceLocationsDeletePath = '/accounts/service-locations/{id}/';
  static readonly accountsServicePhotosListPath = '/accounts/service-photos/';
  static readonly accountsServicePhotosCreatePath = '/accounts/service-photos/';
  static readonly accountsServicePhotosReadPath = '/accounts/service-photos/{id}/';
  static readonly accountsServicePhotosUpdatePath = '/accounts/service-photos/{id}/';
  static readonly accountsServicePhotosPartialUpdatePath = '/accounts/service-photos/{id}/';
  static readonly accountsServicePhotosDeletePath = '/accounts/service-photos/{id}/';
  static readonly accountsServicePricesListPath = '/accounts/service-prices/';
  static readonly accountsServicePricesCreatePath = '/accounts/service-prices/';
  static readonly accountsServicePricesReadPath = '/accounts/service-prices/{id}/';
  static readonly accountsServicePricesUpdatePath = '/accounts/service-prices/{id}/';
  static readonly accountsServicePricesPartialUpdatePath = '/accounts/service-prices/{id}/';
  static readonly accountsServicePricesDeletePath = '/accounts/service-prices/{id}/';
  static readonly accountsServiceSchedulePeriodsListPath = '/accounts/service-schedule-periods/';
  static readonly accountsServiceSchedulePeriodsCreatePath = '/accounts/service-schedule-periods/';
  static readonly accountsServiceSchedulePeriodsReadPath = '/accounts/service-schedule-periods/{id}/';
  static readonly accountsServiceSchedulePeriodsUpdatePath = '/accounts/service-schedule-periods/{id}/';
  static readonly accountsServiceSchedulePeriodsPartialUpdatePath = '/accounts/service-schedule-periods/{id}/';
  static readonly accountsServiceSchedulePeriodsDeletePath = '/accounts/service-schedule-periods/{id}/';
  static readonly accountsServiceScheduleListPath = '/accounts/service-schedule/';
  static readonly accountsServiceScheduleCreatePath = '/accounts/service-schedule/';
  static readonly accountsServiceScheduleSetPath = '/accounts/service-schedule/set/';
  static readonly accountsServiceScheduleReadPath = '/accounts/service-schedule/{id}/';
  static readonly accountsServiceScheduleUpdatePath = '/accounts/service-schedule/{id}/';
  static readonly accountsServiceSchedulePartialUpdatePath = '/accounts/service-schedule/{id}/';
  static readonly accountsServiceScheduleDeletePath = '/accounts/service-schedule/{id}/';
  static readonly accountsServiceTagsListPath = '/accounts/service-tags/';
  static readonly accountsServiceTagsCreatePath = '/accounts/service-tags/';
  static readonly accountsServiceTagsReadPath = '/accounts/service-tags/{id}/';
  static readonly accountsServiceTagsUpdatePath = '/accounts/service-tags/{id}/';
  static readonly accountsServiceTagsPartialUpdatePath = '/accounts/service-tags/{id}/';
  static readonly accountsServiceTagsDeletePath = '/accounts/service-tags/{id}/';
  static readonly accountsServicesListPath = '/accounts/services/';
  static readonly accountsServicesCreatePath = '/accounts/services/';
  static readonly accountsServicesReadPath = '/accounts/services/{id}/';
  static readonly accountsServicesUpdatePath = '/accounts/services/{id}/';
  static readonly accountsServicesPartialUpdatePath = '/accounts/services/{id}/';
  static readonly accountsServicesDeletePath = '/accounts/services/{id}/';
  static readonly accountsSettingsListPath = '/accounts/settings/';
  static readonly accountsSettingsCreatePath = '/accounts/settings/';
  static readonly accountsSettingsReadPath = '/accounts/settings/{id}/';
  static readonly accountsSettingsUpdatePath = '/accounts/settings/{id}/';
  static readonly accountsSettingsPartialUpdatePath = '/accounts/settings/{id}/';
  static readonly accountsSettingsDeletePath = '/accounts/settings/{id}/';
  static readonly accountsVerifyEmailCreatePath = '/accounts/verify-email/';
  static readonly accountsVerifyRegistrationCreatePath = '/accounts/verify-registration/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Change the user password.
   * @param data undefined
   */
  accountsChangePasswordCreateResponse(data: ChangePassword): __Observable<__StrictHttpResponse<ChangePassword>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/change-password/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ChangePassword>;
      })
    );
  }
  /**
   * Change the user password.
   * @param data undefined
   */
  accountsChangePasswordCreate(data: ChangePassword): __Observable<ChangePassword> {
    return this.accountsChangePasswordCreateResponse(data).pipe(
      __map(_r => _r.body as ChangePassword)
    );
  }

  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `contact`:
   */
  accountsContactsListResponse(params: AccountsService.AccountsContactsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserContact>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.contact != null) __params = __params.set('contact', params.contact.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/contacts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserContact>}>;
      })
    );
  }
  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `contact`:
   */
  accountsContactsList(params: AccountsService.AccountsContactsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserContact>}> {
    return this.accountsContactsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserContact>})
    );
  }

  /**
   * The user contacts viewset.
   * @param data undefined
   */
  accountsContactsCreateResponse(data: UserContact): __Observable<__StrictHttpResponse<UserContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/contacts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserContact>;
      })
    );
  }
  /**
   * The user contacts viewset.
   * @param data undefined
   */
  accountsContactsCreate(data: UserContact): __Observable<UserContact> {
    return this.accountsContactsCreateResponse(data).pipe(
      __map(_r => _r.body as UserContact)
    );
  }

  /**
   * The user contacts viewset.
   * @param id A unique integer value identifying this user contact.
   */
  accountsContactsReadResponse(id: number): __Observable<__StrictHttpResponse<UserContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/contacts/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserContact>;
      })
    );
  }
  /**
   * The user contacts viewset.
   * @param id A unique integer value identifying this user contact.
   */
  accountsContactsRead(id: number): __Observable<UserContact> {
    return this.accountsContactsReadResponse(id).pipe(
      __map(_r => _r.body as UserContact)
    );
  }

  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user contact.
   *
   * - `data`:
   */
  accountsContactsUpdateResponse(params: AccountsService.AccountsContactsUpdateParams): __Observable<__StrictHttpResponse<UserContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/contacts/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserContact>;
      })
    );
  }
  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user contact.
   *
   * - `data`:
   */
  accountsContactsUpdate(params: AccountsService.AccountsContactsUpdateParams): __Observable<UserContact> {
    return this.accountsContactsUpdateResponse(params).pipe(
      __map(_r => _r.body as UserContact)
    );
  }

  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user contact.
   *
   * - `data`:
   */
  accountsContactsPartialUpdateResponse(params: AccountsService.AccountsContactsPartialUpdateParams): __Observable<__StrictHttpResponse<UserContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/contacts/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserContact>;
      })
    );
  }
  /**
   * The user contacts viewset.
   * @param params The `AccountsService.AccountsContactsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user contact.
   *
   * - `data`:
   */
  accountsContactsPartialUpdate(params: AccountsService.AccountsContactsPartialUpdateParams): __Observable<UserContact> {
    return this.accountsContactsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as UserContact)
    );
  }

  /**
   * The user contacts viewset.
   * @param id A unique integer value identifying this user contact.
   */
  accountsContactsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/contacts/${encodeURIComponent(id)}/`,
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
   * The user contacts viewset.
   * @param id A unique integer value identifying this user contact.
   */
  accountsContactsDelete(id: number): __Observable<null> {
    return this.accountsContactsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Check if a user registered.
   */
  accountsIsUserRegisteredCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/is-user-registered`,
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
   * Check if a user registered.
   */
  accountsIsUserRegisteredCreate(): __Observable<null> {
    return this.accountsIsUserRegisteredCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsLanguagesListResponse(params: AccountsService.AccountsLanguagesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserLanguage>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/languages/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserLanguage>}>;
      })
    );
  }
  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsLanguagesList(params: AccountsService.AccountsLanguagesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserLanguage>}> {
    return this.accountsLanguagesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserLanguage>})
    );
  }

  /**
   * The user languages viewset.
   * @param data undefined
   */
  accountsLanguagesCreateResponse(data: UserLanguage): __Observable<__StrictHttpResponse<UserLanguage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/languages/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLanguage>;
      })
    );
  }
  /**
   * The user languages viewset.
   * @param data undefined
   */
  accountsLanguagesCreate(data: UserLanguage): __Observable<UserLanguage> {
    return this.accountsLanguagesCreateResponse(data).pipe(
      __map(_r => _r.body as UserLanguage)
    );
  }

  /**
   * The user languages viewset.
   * @param id A unique integer value identifying this user language.
   */
  accountsLanguagesReadResponse(id: number): __Observable<__StrictHttpResponse<UserLanguage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/languages/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLanguage>;
      })
    );
  }
  /**
   * The user languages viewset.
   * @param id A unique integer value identifying this user language.
   */
  accountsLanguagesRead(id: number): __Observable<UserLanguage> {
    return this.accountsLanguagesReadResponse(id).pipe(
      __map(_r => _r.body as UserLanguage)
    );
  }

  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user language.
   *
   * - `data`:
   */
  accountsLanguagesUpdateResponse(params: AccountsService.AccountsLanguagesUpdateParams): __Observable<__StrictHttpResponse<UserLanguage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/languages/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLanguage>;
      })
    );
  }
  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user language.
   *
   * - `data`:
   */
  accountsLanguagesUpdate(params: AccountsService.AccountsLanguagesUpdateParams): __Observable<UserLanguage> {
    return this.accountsLanguagesUpdateResponse(params).pipe(
      __map(_r => _r.body as UserLanguage)
    );
  }

  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user language.
   *
   * - `data`:
   */
  accountsLanguagesPartialUpdateResponse(params: AccountsService.AccountsLanguagesPartialUpdateParams): __Observable<__StrictHttpResponse<UserLanguage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/languages/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLanguage>;
      })
    );
  }
  /**
   * The user languages viewset.
   * @param params The `AccountsService.AccountsLanguagesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user language.
   *
   * - `data`:
   */
  accountsLanguagesPartialUpdate(params: AccountsService.AccountsLanguagesPartialUpdateParams): __Observable<UserLanguage> {
    return this.accountsLanguagesPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as UserLanguage)
    );
  }

  /**
   * The user languages viewset.
   * @param id A unique integer value identifying this user language.
   */
  accountsLanguagesDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/languages/${encodeURIComponent(id)}/`,
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
   * The user languages viewset.
   * @param id A unique integer value identifying this user language.
   */
  accountsLanguagesDelete(id: number): __Observable<null> {
    return this.accountsLanguagesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsListParams` containing the following parameters:
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
   */
  accountsLocationsListResponse(params: AccountsService.AccountsLocationsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserLocation>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isDefault != null) __params = __params.set('is_default', params.isDefault.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserLocation>}>;
      })
    );
  }
  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsListParams` containing the following parameters:
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
   */
  accountsLocationsList(params: AccountsService.AccountsLocationsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserLocation>}> {
    return this.accountsLocationsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserLocation>})
    );
  }

  /**
   * The user locations viewset.
   * @param data undefined
   */
  accountsLocationsCreateResponse(data: UserLocation): __Observable<__StrictHttpResponse<UserLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLocation>;
      })
    );
  }
  /**
   * The user locations viewset.
   * @param data undefined
   */
  accountsLocationsCreate(data: UserLocation): __Observable<UserLocation> {
    return this.accountsLocationsCreateResponse(data).pipe(
      __map(_r => _r.body as UserLocation)
    );
  }

  /**
   * The user locations viewset.
   * @param id A unique integer value identifying this user location.
   */
  accountsLocationsReadResponse(id: number): __Observable<__StrictHttpResponse<UserLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/locations/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLocation>;
      })
    );
  }
  /**
   * The user locations viewset.
   * @param id A unique integer value identifying this user location.
   */
  accountsLocationsRead(id: number): __Observable<UserLocation> {
    return this.accountsLocationsReadResponse(id).pipe(
      __map(_r => _r.body as UserLocation)
    );
  }

  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user location.
   *
   * - `data`:
   */
  accountsLocationsUpdateResponse(params: AccountsService.AccountsLocationsUpdateParams): __Observable<__StrictHttpResponse<UserLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLocation>;
      })
    );
  }
  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user location.
   *
   * - `data`:
   */
  accountsLocationsUpdate(params: AccountsService.AccountsLocationsUpdateParams): __Observable<UserLocation> {
    return this.accountsLocationsUpdateResponse(params).pipe(
      __map(_r => _r.body as UserLocation)
    );
  }

  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user location.
   *
   * - `data`:
   */
  accountsLocationsPartialUpdateResponse(params: AccountsService.AccountsLocationsPartialUpdateParams): __Observable<__StrictHttpResponse<UserLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserLocation>;
      })
    );
  }
  /**
   * The user locations viewset.
   * @param params The `AccountsService.AccountsLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user location.
   *
   * - `data`:
   */
  accountsLocationsPartialUpdate(params: AccountsService.AccountsLocationsPartialUpdateParams): __Observable<UserLocation> {
    return this.accountsLocationsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as UserLocation)
    );
  }

  /**
   * The user locations viewset.
   * @param id A unique integer value identifying this user location.
   */
  accountsLocationsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/locations/${encodeURIComponent(id)}/`,
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
   * The user locations viewset.
   * @param id A unique integer value identifying this user location.
   */
  accountsLocationsDelete(id: number): __Observable<null> {
    return this.accountsLocationsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `remind_before_datetime__lte`:
   *
   * - `remind_before_datetime__lt`:
   *
   * - `remind_before_datetime__gte`:
   *
   * - `remind_before_datetime__gt`:
   *
   * - `remind_before_datetime`:
   *
   * - `remind_before__lte`:
   *
   * - `remind_before__lt`:
   *
   * - `remind_before__gte`:
   *
   * - `remind_before__gt`:
   *
   * - `remind_before`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_reminded`:
   */
  accountsOrderRemindersListResponse(params: AccountsService.AccountsOrderRemindersListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<OrderReminder>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.remindBeforeDatetimeLte != null) __params = __params.set('remind_before_datetime__lte', params.remindBeforeDatetimeLte.toString());
    if (params.remindBeforeDatetimeLt != null) __params = __params.set('remind_before_datetime__lt', params.remindBeforeDatetimeLt.toString());
    if (params.remindBeforeDatetimeGte != null) __params = __params.set('remind_before_datetime__gte', params.remindBeforeDatetimeGte.toString());
    if (params.remindBeforeDatetimeGt != null) __params = __params.set('remind_before_datetime__gt', params.remindBeforeDatetimeGt.toString());
    if (params.remindBeforeDatetime != null) __params = __params.set('remind_before_datetime', params.remindBeforeDatetime.toString());
    if (params.remindBeforeLte != null) __params = __params.set('remind_before__lte', params.remindBeforeLte.toString());
    if (params.remindBeforeLt != null) __params = __params.set('remind_before__lt', params.remindBeforeLt.toString());
    if (params.remindBeforeGte != null) __params = __params.set('remind_before__gte', params.remindBeforeGte.toString());
    if (params.remindBeforeGt != null) __params = __params.set('remind_before__gt', params.remindBeforeGt.toString());
    if (params.remindBefore != null) __params = __params.set('remind_before', params.remindBefore.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isReminded != null) __params = __params.set('is_reminded', params.isReminded.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/order-reminders/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<OrderReminder>}>;
      })
    );
  }
  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `remind_before_datetime__lte`:
   *
   * - `remind_before_datetime__lt`:
   *
   * - `remind_before_datetime__gte`:
   *
   * - `remind_before_datetime__gt`:
   *
   * - `remind_before_datetime`:
   *
   * - `remind_before__lte`:
   *
   * - `remind_before__lt`:
   *
   * - `remind_before__gte`:
   *
   * - `remind_before__gt`:
   *
   * - `remind_before`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_reminded`:
   */
  accountsOrderRemindersList(params: AccountsService.AccountsOrderRemindersListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<OrderReminder>}> {
    return this.accountsOrderRemindersListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<OrderReminder>})
    );
  }

  /**
   * The order reminders viewset.
   * @param data undefined
   */
  accountsOrderRemindersCreateResponse(data: OrderReminder): __Observable<__StrictHttpResponse<OrderReminder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/order-reminders/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderReminder>;
      })
    );
  }
  /**
   * The order reminders viewset.
   * @param data undefined
   */
  accountsOrderRemindersCreate(data: OrderReminder): __Observable<OrderReminder> {
    return this.accountsOrderRemindersCreateResponse(data).pipe(
      __map(_r => _r.body as OrderReminder)
    );
  }

  /**
   * The order reminders viewset.
   * @param id A unique integer value identifying this order reminder.
   */
  accountsOrderRemindersReadResponse(id: number): __Observable<__StrictHttpResponse<OrderReminder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/order-reminders/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderReminder>;
      })
    );
  }
  /**
   * The order reminders viewset.
   * @param id A unique integer value identifying this order reminder.
   */
  accountsOrderRemindersRead(id: number): __Observable<OrderReminder> {
    return this.accountsOrderRemindersReadResponse(id).pipe(
      __map(_r => _r.body as OrderReminder)
    );
  }

  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order reminder.
   *
   * - `data`:
   */
  accountsOrderRemindersUpdateResponse(params: AccountsService.AccountsOrderRemindersUpdateParams): __Observable<__StrictHttpResponse<OrderReminder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/order-reminders/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderReminder>;
      })
    );
  }
  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order reminder.
   *
   * - `data`:
   */
  accountsOrderRemindersUpdate(params: AccountsService.AccountsOrderRemindersUpdateParams): __Observable<OrderReminder> {
    return this.accountsOrderRemindersUpdateResponse(params).pipe(
      __map(_r => _r.body as OrderReminder)
    );
  }

  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order reminder.
   *
   * - `data`:
   */
  accountsOrderRemindersPartialUpdateResponse(params: AccountsService.AccountsOrderRemindersPartialUpdateParams): __Observable<__StrictHttpResponse<OrderReminder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/order-reminders/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderReminder>;
      })
    );
  }
  /**
   * The order reminders viewset.
   * @param params The `AccountsService.AccountsOrderRemindersPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order reminder.
   *
   * - `data`:
   */
  accountsOrderRemindersPartialUpdate(params: AccountsService.AccountsOrderRemindersPartialUpdateParams): __Observable<OrderReminder> {
    return this.accountsOrderRemindersPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as OrderReminder)
    );
  }

  /**
   * The order reminders viewset.
   * @param id A unique integer value identifying this order reminder.
   */
  accountsOrderRemindersDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/order-reminders/${encodeURIComponent(id)}/`,
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
   * The order reminders viewset.
   * @param id A unique integer value identifying this order reminder.
   */
  accountsOrderRemindersDelete(id: number): __Observable<null> {
    return this.accountsOrderRemindersDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedListParams` containing the following parameters:
   *
   * - `status__in`: Multiple values may be separated by commas.
   *
   * - `start_datetime__lte`:
   *
   * - `start_datetime__lt`:
   *
   * - `start_datetime__gte`:
   *
   * - `start_datetime__gt`:
   *
   * - `start_datetime`:
   *
   * - `source__in`: Multiple values may be separated by commas.
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_another_person`:
   *
   * - `end_datetime__lte`:
   *
   * - `end_datetime__lt`:
   *
   * - `end_datetime__gte`:
   *
   * - `end_datetime__gt`:
   *
   * - `end_datetime`:
   */
  accountsOrdersReceivedListResponse(params: AccountsService.AccountsOrdersReceivedListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedOrder>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.statusIn != null) __params = __params.set('status__in', params.statusIn.toString());
    if (params.startDatetimeLte != null) __params = __params.set('start_datetime__lte', params.startDatetimeLte.toString());
    if (params.startDatetimeLt != null) __params = __params.set('start_datetime__lt', params.startDatetimeLt.toString());
    if (params.startDatetimeGte != null) __params = __params.set('start_datetime__gte', params.startDatetimeGte.toString());
    if (params.startDatetimeGt != null) __params = __params.set('start_datetime__gt', params.startDatetimeGt.toString());
    if (params.startDatetime != null) __params = __params.set('start_datetime', params.startDatetime.toString());
    if (params.sourceIn != null) __params = __params.set('source__in', params.sourceIn.toString());
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isAnotherPerson != null) __params = __params.set('is_another_person', params.isAnotherPerson.toString());
    if (params.endDatetimeLte != null) __params = __params.set('end_datetime__lte', params.endDatetimeLte.toString());
    if (params.endDatetimeLt != null) __params = __params.set('end_datetime__lt', params.endDatetimeLt.toString());
    if (params.endDatetimeGte != null) __params = __params.set('end_datetime__gte', params.endDatetimeGte.toString());
    if (params.endDatetimeGt != null) __params = __params.set('end_datetime__gt', params.endDatetimeGt.toString());
    if (params.endDatetime != null) __params = __params.set('end_datetime', params.endDatetime.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/orders/received/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedOrder>}>;
      })
    );
  }
  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedListParams` containing the following parameters:
   *
   * - `status__in`: Multiple values may be separated by commas.
   *
   * - `start_datetime__lte`:
   *
   * - `start_datetime__lt`:
   *
   * - `start_datetime__gte`:
   *
   * - `start_datetime__gt`:
   *
   * - `start_datetime`:
   *
   * - `source__in`: Multiple values may be separated by commas.
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_another_person`:
   *
   * - `end_datetime__lte`:
   *
   * - `end_datetime__lt`:
   *
   * - `end_datetime__gte`:
   *
   * - `end_datetime__gt`:
   *
   * - `end_datetime`:
   */
  accountsOrdersReceivedList(params: AccountsService.AccountsOrdersReceivedListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ReceivedOrder>}> {
    return this.accountsOrdersReceivedListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ReceivedOrder>})
    );
  }

  /**
   * The received orders viewset.
   * @param id A unique integer value identifying this order.
   */
  accountsOrdersReceivedReadResponse(id: number): __Observable<__StrictHttpResponse<ReceivedOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/orders/received/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReceivedOrder>;
      })
    );
  }
  /**
   * The received orders viewset.
   * @param id A unique integer value identifying this order.
   */
  accountsOrdersReceivedRead(id: number): __Observable<ReceivedOrder> {
    return this.accountsOrdersReceivedReadResponse(id).pipe(
      __map(_r => _r.body as ReceivedOrder)
    );
  }

  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersReceivedUpdateResponse(params: AccountsService.AccountsOrdersReceivedUpdateParams): __Observable<__StrictHttpResponse<ReceivedOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/orders/received/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReceivedOrder>;
      })
    );
  }
  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersReceivedUpdate(params: AccountsService.AccountsOrdersReceivedUpdateParams): __Observable<ReceivedOrder> {
    return this.accountsOrdersReceivedUpdateResponse(params).pipe(
      __map(_r => _r.body as ReceivedOrder)
    );
  }

  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersReceivedPartialUpdateResponse(params: AccountsService.AccountsOrdersReceivedPartialUpdateParams): __Observable<__StrictHttpResponse<ReceivedOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/orders/received/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReceivedOrder>;
      })
    );
  }
  /**
   * The received orders viewset.
   * @param params The `AccountsService.AccountsOrdersReceivedPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersReceivedPartialUpdate(params: AccountsService.AccountsOrdersReceivedPartialUpdateParams): __Observable<ReceivedOrder> {
    return this.accountsOrdersReceivedPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ReceivedOrder)
    );
  }

  /**
   * The sent messages viewset.
   * @param params The `AccountsService.AccountsOrdersSentListParams` containing the following parameters:
   *
   * - `status__in`: Multiple values may be separated by commas.
   *
   * - `start_datetime__lte`:
   *
   * - `start_datetime__lt`:
   *
   * - `start_datetime__gte`:
   *
   * - `start_datetime__gt`:
   *
   * - `start_datetime`:
   *
   * - `source__in`: Multiple values may be separated by commas.
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_another_person`:
   *
   * - `end_datetime__lte`:
   *
   * - `end_datetime__lt`:
   *
   * - `end_datetime__gte`:
   *
   * - `end_datetime__gt`:
   *
   * - `end_datetime`:
   */
  accountsOrdersSentListResponse(params: AccountsService.AccountsOrdersSentListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SentOrder>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.statusIn != null) __params = __params.set('status__in', params.statusIn.toString());
    if (params.startDatetimeLte != null) __params = __params.set('start_datetime__lte', params.startDatetimeLte.toString());
    if (params.startDatetimeLt != null) __params = __params.set('start_datetime__lt', params.startDatetimeLt.toString());
    if (params.startDatetimeGte != null) __params = __params.set('start_datetime__gte', params.startDatetimeGte.toString());
    if (params.startDatetimeGt != null) __params = __params.set('start_datetime__gt', params.startDatetimeGt.toString());
    if (params.startDatetime != null) __params = __params.set('start_datetime', params.startDatetime.toString());
    if (params.sourceIn != null) __params = __params.set('source__in', params.sourceIn.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isAnotherPerson != null) __params = __params.set('is_another_person', params.isAnotherPerson.toString());
    if (params.endDatetimeLte != null) __params = __params.set('end_datetime__lte', params.endDatetimeLte.toString());
    if (params.endDatetimeLt != null) __params = __params.set('end_datetime__lt', params.endDatetimeLt.toString());
    if (params.endDatetimeGte != null) __params = __params.set('end_datetime__gte', params.endDatetimeGte.toString());
    if (params.endDatetimeGt != null) __params = __params.set('end_datetime__gt', params.endDatetimeGt.toString());
    if (params.endDatetime != null) __params = __params.set('end_datetime', params.endDatetime.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/orders/sent/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<SentOrder>}>;
      })
    );
  }
  /**
   * The sent messages viewset.
   * @param params The `AccountsService.AccountsOrdersSentListParams` containing the following parameters:
   *
   * - `status__in`: Multiple values may be separated by commas.
   *
   * - `start_datetime__lte`:
   *
   * - `start_datetime__lt`:
   *
   * - `start_datetime__gte`:
   *
   * - `start_datetime__gt`:
   *
   * - `start_datetime`:
   *
   * - `source__in`: Multiple values may be separated by commas.
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_another_person`:
   *
   * - `end_datetime__lte`:
   *
   * - `end_datetime__lt`:
   *
   * - `end_datetime__gte`:
   *
   * - `end_datetime__gt`:
   *
   * - `end_datetime`:
   */
  accountsOrdersSentList(params: AccountsService.AccountsOrdersSentListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<SentOrder>}> {
    return this.accountsOrdersSentListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<SentOrder>})
    );
  }

  /**
   * The sent messages viewset.
   * @param data undefined
   */
  accountsOrdersSentCreateResponse(data: SentOrder): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/orders/sent/`,
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
   * The sent messages viewset.
   * @param data undefined
   */
  accountsOrdersSentCreate(data: SentOrder): __Observable<SentOrder> {
    return this.accountsOrdersSentCreateResponse(data).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * The sent messages viewset.
   * @param id A unique integer value identifying this order.
   */
  accountsOrdersSentReadResponse(id: number): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/orders/sent/${encodeURIComponent(id)}/`,
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
   * The sent messages viewset.
   * @param id A unique integer value identifying this order.
   */
  accountsOrdersSentRead(id: number): __Observable<SentOrder> {
    return this.accountsOrdersSentReadResponse(id).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * Update the object.
   * @param params The `AccountsService.AccountsOrdersSentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersSentUpdateResponse(params: AccountsService.AccountsOrdersSentUpdateParams): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/orders/sent/${encodeURIComponent(params.id)}/`,
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
   * Update the object.
   * @param params The `AccountsService.AccountsOrdersSentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersSentUpdate(params: AccountsService.AccountsOrdersSentUpdateParams): __Observable<SentOrder> {
    return this.accountsOrdersSentUpdateResponse(params).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * Partial update the object.
   * @param params The `AccountsService.AccountsOrdersSentPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersSentPartialUpdateResponse(params: AccountsService.AccountsOrdersSentPartialUpdateParams): __Observable<__StrictHttpResponse<SentOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/orders/sent/${encodeURIComponent(params.id)}/`,
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
   * Partial update the object.
   * @param params The `AccountsService.AccountsOrdersSentPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this order.
   *
   * - `data`:
   */
  accountsOrdersSentPartialUpdate(params: AccountsService.AccountsOrdersSentPartialUpdateParams): __Observable<SentOrder> {
    return this.accountsOrdersSentPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as SentOrder)
    );
  }

  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalCertificatesListResponse(params: AccountsService.AccountsProfessionalCertificatesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalCertificate>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-certificates/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalCertificate>}>;
      })
    );
  }
  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalCertificatesList(params: AccountsService.AccountsProfessionalCertificatesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalCertificate>}> {
    return this.accountsProfessionalCertificatesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalCertificate>})
    );
  }

  /**
   * The professional certificate viewset.
   * @param data undefined
   */
  accountsProfessionalCertificatesCreateResponse(data: ProfessionalCertificate): __Observable<__StrictHttpResponse<ProfessionalCertificate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-certificates/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalCertificate>;
      })
    );
  }
  /**
   * The professional certificate viewset.
   * @param data undefined
   */
  accountsProfessionalCertificatesCreate(data: ProfessionalCertificate): __Observable<ProfessionalCertificate> {
    return this.accountsProfessionalCertificatesCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalCertificate)
    );
  }

  /**
   * The professional certificate viewset.
   * @param id A unique integer value identifying this professional certificate.
   */
  accountsProfessionalCertificatesReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalCertificate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-certificates/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalCertificate>;
      })
    );
  }
  /**
   * The professional certificate viewset.
   * @param id A unique integer value identifying this professional certificate.
   */
  accountsProfessionalCertificatesRead(id: number): __Observable<ProfessionalCertificate> {
    return this.accountsProfessionalCertificatesReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalCertificate)
    );
  }

  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional certificate.
   *
   * - `data`:
   */
  accountsProfessionalCertificatesUpdateResponse(params: AccountsService.AccountsProfessionalCertificatesUpdateParams): __Observable<__StrictHttpResponse<ProfessionalCertificate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-certificates/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalCertificate>;
      })
    );
  }
  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional certificate.
   *
   * - `data`:
   */
  accountsProfessionalCertificatesUpdate(params: AccountsService.AccountsProfessionalCertificatesUpdateParams): __Observable<ProfessionalCertificate> {
    return this.accountsProfessionalCertificatesUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalCertificate)
    );
  }

  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional certificate.
   *
   * - `data`:
   */
  accountsProfessionalCertificatesPartialUpdateResponse(params: AccountsService.AccountsProfessionalCertificatesPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalCertificate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-certificates/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalCertificate>;
      })
    );
  }
  /**
   * The professional certificate viewset.
   * @param params The `AccountsService.AccountsProfessionalCertificatesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional certificate.
   *
   * - `data`:
   */
  accountsProfessionalCertificatesPartialUpdate(params: AccountsService.AccountsProfessionalCertificatesPartialUpdateParams): __Observable<ProfessionalCertificate> {
    return this.accountsProfessionalCertificatesPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalCertificate)
    );
  }

  /**
   * The professional certificate viewset.
   * @param id A unique integer value identifying this professional certificate.
   */
  accountsProfessionalCertificatesDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-certificates/${encodeURIComponent(id)}/`,
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
   * The professional certificate viewset.
   * @param id A unique integer value identifying this professional certificate.
   */
  accountsProfessionalCertificatesDelete(id: number): __Observable<null> {
    return this.accountsProfessionalCertificatesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   */
  accountsProfessionalClosedPeriodsListResponse(params: AccountsService.AccountsProfessionalClosedPeriodsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalClosedPeriod>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-closed-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalClosedPeriod>}>;
      })
    );
  }
  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   */
  accountsProfessionalClosedPeriodsList(params: AccountsService.AccountsProfessionalClosedPeriodsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalClosedPeriod>}> {
    return this.accountsProfessionalClosedPeriodsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalClosedPeriod>})
    );
  }

  /**
   * The professional closed period viewset.
   * @param data undefined
   */
  accountsProfessionalClosedPeriodsCreateResponse(data: ProfessionalClosedPeriod): __Observable<__StrictHttpResponse<ProfessionalClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-closed-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalClosedPeriod>;
      })
    );
  }
  /**
   * The professional closed period viewset.
   * @param data undefined
   */
  accountsProfessionalClosedPeriodsCreate(data: ProfessionalClosedPeriod): __Observable<ProfessionalClosedPeriod> {
    return this.accountsProfessionalClosedPeriodsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalClosedPeriod)
    );
  }

  /**
   * The professional closed period viewset.
   * @param id A unique integer value identifying this professional closed period.
   */
  accountsProfessionalClosedPeriodsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-closed-periods/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalClosedPeriod>;
      })
    );
  }
  /**
   * The professional closed period viewset.
   * @param id A unique integer value identifying this professional closed period.
   */
  accountsProfessionalClosedPeriodsRead(id: number): __Observable<ProfessionalClosedPeriod> {
    return this.accountsProfessionalClosedPeriodsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalClosedPeriod)
    );
  }

  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional closed period.
   *
   * - `data`:
   */
  accountsProfessionalClosedPeriodsUpdateResponse(params: AccountsService.AccountsProfessionalClosedPeriodsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-closed-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalClosedPeriod>;
      })
    );
  }
  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional closed period.
   *
   * - `data`:
   */
  accountsProfessionalClosedPeriodsUpdate(params: AccountsService.AccountsProfessionalClosedPeriodsUpdateParams): __Observable<ProfessionalClosedPeriod> {
    return this.accountsProfessionalClosedPeriodsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalClosedPeriod)
    );
  }

  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional closed period.
   *
   * - `data`:
   */
  accountsProfessionalClosedPeriodsPartialUpdateResponse(params: AccountsService.AccountsProfessionalClosedPeriodsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-closed-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalClosedPeriod>;
      })
    );
  }
  /**
   * The professional closed period viewset.
   * @param params The `AccountsService.AccountsProfessionalClosedPeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional closed period.
   *
   * - `data`:
   */
  accountsProfessionalClosedPeriodsPartialUpdate(params: AccountsService.AccountsProfessionalClosedPeriodsPartialUpdateParams): __Observable<ProfessionalClosedPeriod> {
    return this.accountsProfessionalClosedPeriodsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalClosedPeriod)
    );
  }

  /**
   * The professional closed period viewset.
   * @param id A unique integer value identifying this professional closed period.
   */
  accountsProfessionalClosedPeriodsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-closed-periods/${encodeURIComponent(id)}/`,
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
   * The professional closed period viewset.
   * @param id A unique integer value identifying this professional closed period.
   */
  accountsProfessionalClosedPeriodsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalClosedPeriodsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalContactsListResponse(params: AccountsService.AccountsProfessionalContactsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalContact>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-contacts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalContact>}>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalContactsList(params: AccountsService.AccountsProfessionalContactsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalContact>}> {
    return this.accountsProfessionalContactsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalContact>})
    );
  }

  /**
   * The professional contact viewset.
   * @param data undefined
   */
  accountsProfessionalContactsCreateResponse(data: ProfessionalContact): __Observable<__StrictHttpResponse<ProfessionalContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-contacts/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalContact>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param data undefined
   */
  accountsProfessionalContactsCreate(data: ProfessionalContact): __Observable<ProfessionalContact> {
    return this.accountsProfessionalContactsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalContact)
    );
  }

  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional contact.
   */
  accountsProfessionalContactsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-contacts/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalContact>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional contact.
   */
  accountsProfessionalContactsRead(id: number): __Observable<ProfessionalContact> {
    return this.accountsProfessionalContactsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalContact)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional contact.
   *
   * - `data`:
   */
  accountsProfessionalContactsUpdateResponse(params: AccountsService.AccountsProfessionalContactsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-contacts/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalContact>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional contact.
   *
   * - `data`:
   */
  accountsProfessionalContactsUpdate(params: AccountsService.AccountsProfessionalContactsUpdateParams): __Observable<ProfessionalContact> {
    return this.accountsProfessionalContactsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalContact)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional contact.
   *
   * - `data`:
   */
  accountsProfessionalContactsPartialUpdateResponse(params: AccountsService.AccountsProfessionalContactsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalContact>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-contacts/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalContact>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalContactsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional contact.
   *
   * - `data`:
   */
  accountsProfessionalContactsPartialUpdate(params: AccountsService.AccountsProfessionalContactsPartialUpdateParams): __Observable<ProfessionalContact> {
    return this.accountsProfessionalContactsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalContact)
    );
  }

  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional contact.
   */
  accountsProfessionalContactsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-contacts/${encodeURIComponent(id)}/`,
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
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional contact.
   */
  accountsProfessionalContactsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalContactsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalEducationsListResponse(params: AccountsService.AccountsProfessionalEducationsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalEducation>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-educations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalEducation>}>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalEducationsList(params: AccountsService.AccountsProfessionalEducationsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalEducation>}> {
    return this.accountsProfessionalEducationsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalEducation>})
    );
  }

  /**
   * The professional education viewset.
   * @param data undefined
   */
  accountsProfessionalEducationsCreateResponse(data: ProfessionalEducation): __Observable<__StrictHttpResponse<ProfessionalEducation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-educations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalEducation>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param data undefined
   */
  accountsProfessionalEducationsCreate(data: ProfessionalEducation): __Observable<ProfessionalEducation> {
    return this.accountsProfessionalEducationsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalEducation)
    );
  }

  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional education.
   */
  accountsProfessionalEducationsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalEducation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-educations/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalEducation>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional education.
   */
  accountsProfessionalEducationsRead(id: number): __Observable<ProfessionalEducation> {
    return this.accountsProfessionalEducationsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalEducation)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional education.
   *
   * - `data`:
   */
  accountsProfessionalEducationsUpdateResponse(params: AccountsService.AccountsProfessionalEducationsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalEducation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-educations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalEducation>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional education.
   *
   * - `data`:
   */
  accountsProfessionalEducationsUpdate(params: AccountsService.AccountsProfessionalEducationsUpdateParams): __Observable<ProfessionalEducation> {
    return this.accountsProfessionalEducationsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalEducation)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional education.
   *
   * - `data`:
   */
  accountsProfessionalEducationsPartialUpdateResponse(params: AccountsService.AccountsProfessionalEducationsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalEducation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-educations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalEducation>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalEducationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional education.
   *
   * - `data`:
   */
  accountsProfessionalEducationsPartialUpdate(params: AccountsService.AccountsProfessionalEducationsPartialUpdateParams): __Observable<ProfessionalEducation> {
    return this.accountsProfessionalEducationsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalEducation)
    );
  }

  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional education.
   */
  accountsProfessionalEducationsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-educations/${encodeURIComponent(id)}/`,
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
   * The professional education viewset.
   * @param id A unique integer value identifying this professional education.
   */
  accountsProfessionalEducationsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalEducationsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperienceListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalExperienceListResponse(params: AccountsService.AccountsProfessionalExperienceListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalExperience>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-experience/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalExperience>}>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperienceListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalExperienceList(params: AccountsService.AccountsProfessionalExperienceListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalExperience>}> {
    return this.accountsProfessionalExperienceListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalExperience>})
    );
  }

  /**
   * The professional education viewset.
   * @param data undefined
   */
  accountsProfessionalExperienceCreateResponse(data: ProfessionalExperience): __Observable<__StrictHttpResponse<ProfessionalExperience>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-experience/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalExperience>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param data undefined
   */
  accountsProfessionalExperienceCreate(data: ProfessionalExperience): __Observable<ProfessionalExperience> {
    return this.accountsProfessionalExperienceCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalExperience)
    );
  }

  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional experience.
   */
  accountsProfessionalExperienceReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalExperience>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-experience/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalExperience>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional experience.
   */
  accountsProfessionalExperienceRead(id: number): __Observable<ProfessionalExperience> {
    return this.accountsProfessionalExperienceReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalExperience)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperienceUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional experience.
   *
   * - `data`:
   */
  accountsProfessionalExperienceUpdateResponse(params: AccountsService.AccountsProfessionalExperienceUpdateParams): __Observable<__StrictHttpResponse<ProfessionalExperience>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-experience/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalExperience>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperienceUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional experience.
   *
   * - `data`:
   */
  accountsProfessionalExperienceUpdate(params: AccountsService.AccountsProfessionalExperienceUpdateParams): __Observable<ProfessionalExperience> {
    return this.accountsProfessionalExperienceUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalExperience)
    );
  }

  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperiencePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional experience.
   *
   * - `data`:
   */
  accountsProfessionalExperiencePartialUpdateResponse(params: AccountsService.AccountsProfessionalExperiencePartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalExperience>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-experience/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalExperience>;
      })
    );
  }
  /**
   * The professional education viewset.
   * @param params The `AccountsService.AccountsProfessionalExperiencePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional experience.
   *
   * - `data`:
   */
  accountsProfessionalExperiencePartialUpdate(params: AccountsService.AccountsProfessionalExperiencePartialUpdateParams): __Observable<ProfessionalExperience> {
    return this.accountsProfessionalExperiencePartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalExperience)
    );
  }

  /**
   * The professional education viewset.
   * @param id A unique integer value identifying this professional experience.
   */
  accountsProfessionalExperienceDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-experience/${encodeURIComponent(id)}/`,
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
   * The professional education viewset.
   * @param id A unique integer value identifying this professional experience.
   */
  accountsProfessionalExperienceDelete(id: number): __Observable<null> {
    return this.accountsProfessionalExperienceDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalLocationsListResponse(params: AccountsService.AccountsProfessionalLocationsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalLocation>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalLocation>}>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalLocationsList(params: AccountsService.AccountsProfessionalLocationsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalLocation>}> {
    return this.accountsProfessionalLocationsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalLocation>})
    );
  }

  /**
   * The professional contact viewset.
   * @param data undefined
   */
  accountsProfessionalLocationsCreateResponse(data: ProfessionalLocation): __Observable<__StrictHttpResponse<ProfessionalLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalLocation>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param data undefined
   */
  accountsProfessionalLocationsCreate(data: ProfessionalLocation): __Observable<ProfessionalLocation> {
    return this.accountsProfessionalLocationsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalLocation)
    );
  }

  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional location.
   */
  accountsProfessionalLocationsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-locations/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalLocation>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional location.
   */
  accountsProfessionalLocationsRead(id: number): __Observable<ProfessionalLocation> {
    return this.accountsProfessionalLocationsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalLocation)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional location.
   *
   * - `data`:
   */
  accountsProfessionalLocationsUpdateResponse(params: AccountsService.AccountsProfessionalLocationsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalLocation>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional location.
   *
   * - `data`:
   */
  accountsProfessionalLocationsUpdate(params: AccountsService.AccountsProfessionalLocationsUpdateParams): __Observable<ProfessionalLocation> {
    return this.accountsProfessionalLocationsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalLocation)
    );
  }

  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional location.
   *
   * - `data`:
   */
  accountsProfessionalLocationsPartialUpdateResponse(params: AccountsService.AccountsProfessionalLocationsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalLocation>;
      })
    );
  }
  /**
   * The professional contact viewset.
   * @param params The `AccountsService.AccountsProfessionalLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional location.
   *
   * - `data`:
   */
  accountsProfessionalLocationsPartialUpdate(params: AccountsService.AccountsProfessionalLocationsPartialUpdateParams): __Observable<ProfessionalLocation> {
    return this.accountsProfessionalLocationsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalLocation)
    );
  }

  /**
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional location.
   */
  accountsProfessionalLocationsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-locations/${encodeURIComponent(id)}/`,
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
   * The professional contact viewset.
   * @param id A unique integer value identifying this professional location.
   */
  accountsProfessionalLocationsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalLocationsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalPhotosListResponse(params: AccountsService.AccountsProfessionalPhotosListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhoto>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-photos/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhoto>}>;
      })
    );
  }
  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalPhotosList(params: AccountsService.AccountsProfessionalPhotosListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhoto>}> {
    return this.accountsProfessionalPhotosListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhoto>})
    );
  }

  /**
   * The professional photo viewset.
   * @param data undefined
   */
  accountsProfessionalPhotosCreateResponse(data: ProfessionalPhoto): __Observable<__StrictHttpResponse<ProfessionalPhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-photos/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalPhoto>;
      })
    );
  }
  /**
   * The professional photo viewset.
   * @param data undefined
   */
  accountsProfessionalPhotosCreate(data: ProfessionalPhoto): __Observable<ProfessionalPhoto> {
    return this.accountsProfessionalPhotosCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalPhoto)
    );
  }

  /**
   * The professional photo viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  accountsProfessionalPhotosReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalPhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-photos/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalPhoto>;
      })
    );
  }
  /**
   * The professional photo viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  accountsProfessionalPhotosRead(id: number): __Observable<ProfessionalPhoto> {
    return this.accountsProfessionalPhotosReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalPhoto)
    );
  }

  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional photo.
   *
   * - `data`:
   */
  accountsProfessionalPhotosUpdateResponse(params: AccountsService.AccountsProfessionalPhotosUpdateParams): __Observable<__StrictHttpResponse<ProfessionalPhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-photos/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalPhoto>;
      })
    );
  }
  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional photo.
   *
   * - `data`:
   */
  accountsProfessionalPhotosUpdate(params: AccountsService.AccountsProfessionalPhotosUpdateParams): __Observable<ProfessionalPhoto> {
    return this.accountsProfessionalPhotosUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalPhoto)
    );
  }

  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional photo.
   *
   * - `data`:
   */
  accountsProfessionalPhotosPartialUpdateResponse(params: AccountsService.AccountsProfessionalPhotosPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalPhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-photos/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalPhoto>;
      })
    );
  }
  /**
   * The professional photo viewset.
   * @param params The `AccountsService.AccountsProfessionalPhotosPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional photo.
   *
   * - `data`:
   */
  accountsProfessionalPhotosPartialUpdate(params: AccountsService.AccountsProfessionalPhotosPartialUpdateParams): __Observable<ProfessionalPhoto> {
    return this.accountsProfessionalPhotosPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalPhoto)
    );
  }

  /**
   * The professional photo viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  accountsProfessionalPhotosDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-photos/${encodeURIComponent(id)}/`,
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
   * The professional photo viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  accountsProfessionalPhotosDelete(id: number): __Observable<null> {
    return this.accountsProfessionalPhotosDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsListParams` containing the following parameters:
   *
   * - `start_date`:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `end_date`:
   */
  accountsProfessionalSchedulePeriodsListResponse(params: AccountsService.AccountsProfessionalSchedulePeriodsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedulePeriod>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startDate != null) __params = __params.set('start_date', params.startDate.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    if (params.endDate != null) __params = __params.set('end_date', params.endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-schedule-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedulePeriod>}>;
      })
    );
  }
  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsListParams` containing the following parameters:
   *
   * - `start_date`:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `end_date`:
   */
  accountsProfessionalSchedulePeriodsList(params: AccountsService.AccountsProfessionalSchedulePeriodsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedulePeriod>}> {
    return this.accountsProfessionalSchedulePeriodsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedulePeriod>})
    );
  }

  /**
   * The professional schedule period viewset.
   * @param data undefined
   */
  accountsProfessionalSchedulePeriodsCreateResponse(data: ProfessionalSchedulePeriod): __Observable<__StrictHttpResponse<ProfessionalSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-schedule-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedulePeriod>;
      })
    );
  }
  /**
   * The professional schedule period viewset.
   * @param data undefined
   */
  accountsProfessionalSchedulePeriodsCreate(data: ProfessionalSchedulePeriod): __Observable<ProfessionalSchedulePeriod> {
    return this.accountsProfessionalSchedulePeriodsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalSchedulePeriod)
    );
  }

  /**
   * The professional schedule period viewset.
   * @param id A unique integer value identifying this professional schedule period.
   */
  accountsProfessionalSchedulePeriodsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-schedule-periods/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedulePeriod>;
      })
    );
  }
  /**
   * The professional schedule period viewset.
   * @param id A unique integer value identifying this professional schedule period.
   */
  accountsProfessionalSchedulePeriodsRead(id: number): __Observable<ProfessionalSchedulePeriod> {
    return this.accountsProfessionalSchedulePeriodsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalSchedulePeriod)
    );
  }

  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule period.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePeriodsUpdateResponse(params: AccountsService.AccountsProfessionalSchedulePeriodsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-schedule-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedulePeriod>;
      })
    );
  }
  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule period.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePeriodsUpdate(params: AccountsService.AccountsProfessionalSchedulePeriodsUpdateParams): __Observable<ProfessionalSchedulePeriod> {
    return this.accountsProfessionalSchedulePeriodsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalSchedulePeriod)
    );
  }

  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule period.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePeriodsPartialUpdateResponse(params: AccountsService.AccountsProfessionalSchedulePeriodsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-schedule-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedulePeriod>;
      })
    );
  }
  /**
   * The professional schedule period viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule period.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePeriodsPartialUpdate(params: AccountsService.AccountsProfessionalSchedulePeriodsPartialUpdateParams): __Observable<ProfessionalSchedulePeriod> {
    return this.accountsProfessionalSchedulePeriodsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalSchedulePeriod)
    );
  }

  /**
   * The professional schedule period viewset.
   * @param id A unique integer value identifying this professional schedule period.
   */
  accountsProfessionalSchedulePeriodsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-schedule-periods/${encodeURIComponent(id)}/`,
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
   * The professional schedule period viewset.
   * @param id A unique integer value identifying this professional schedule period.
   */
  accountsProfessionalSchedulePeriodsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalSchedulePeriodsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalScheduleListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `day_of_week`:
   */
  accountsProfessionalScheduleListResponse(params: AccountsService.AccountsProfessionalScheduleListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedule>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    if (params.dayOfWeek != null) __params = __params.set('day_of_week', params.dayOfWeek.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-schedule/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedule>}>;
      })
    );
  }
  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalScheduleListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `day_of_week`:
   */
  accountsProfessionalScheduleList(params: AccountsService.AccountsProfessionalScheduleListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedule>}> {
    return this.accountsProfessionalScheduleListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalSchedule>})
    );
  }

  /**
   * The professional schedule viewset.
   * @param data undefined
   */
  accountsProfessionalScheduleCreateResponse(data: ProfessionalSchedule): __Observable<__StrictHttpResponse<ProfessionalSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-schedule/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedule>;
      })
    );
  }
  /**
   * The professional schedule viewset.
   * @param data undefined
   */
  accountsProfessionalScheduleCreate(data: ProfessionalSchedule): __Observable<ProfessionalSchedule> {
    return this.accountsProfessionalScheduleCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalSchedule)
    );
  }

  /**
   * Set the professional schedules.
   * @param data undefined
   */
  accountsProfessionalScheduleSetResponse(data: Array<ProfessionalSchedule>): __Observable<__StrictHttpResponse<Array<ProfessionalSchedule>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-schedule/set/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProfessionalSchedule>>;
      })
    );
  }
  /**
   * Set the professional schedules.
   * @param data undefined
   */
  accountsProfessionalScheduleSet(data: Array<ProfessionalSchedule>): __Observable<Array<ProfessionalSchedule>> {
    return this.accountsProfessionalScheduleSetResponse(data).pipe(
      __map(_r => _r.body as Array<ProfessionalSchedule>)
    );
  }

  /**
   * The professional schedule viewset.
   * @param id A unique integer value identifying this professional schedule.
   */
  accountsProfessionalScheduleReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-schedule/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedule>;
      })
    );
  }
  /**
   * The professional schedule viewset.
   * @param id A unique integer value identifying this professional schedule.
   */
  accountsProfessionalScheduleRead(id: number): __Observable<ProfessionalSchedule> {
    return this.accountsProfessionalScheduleReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalSchedule)
    );
  }

  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalScheduleUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule.
   *
   * - `data`:
   */
  accountsProfessionalScheduleUpdateResponse(params: AccountsService.AccountsProfessionalScheduleUpdateParams): __Observable<__StrictHttpResponse<ProfessionalSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-schedule/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedule>;
      })
    );
  }
  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalScheduleUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule.
   *
   * - `data`:
   */
  accountsProfessionalScheduleUpdate(params: AccountsService.AccountsProfessionalScheduleUpdateParams): __Observable<ProfessionalSchedule> {
    return this.accountsProfessionalScheduleUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalSchedule)
    );
  }

  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePartialUpdateResponse(params: AccountsService.AccountsProfessionalSchedulePartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-schedule/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalSchedule>;
      })
    );
  }
  /**
   * The professional schedule viewset.
   * @param params The `AccountsService.AccountsProfessionalSchedulePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional schedule.
   *
   * - `data`:
   */
  accountsProfessionalSchedulePartialUpdate(params: AccountsService.AccountsProfessionalSchedulePartialUpdateParams): __Observable<ProfessionalSchedule> {
    return this.accountsProfessionalSchedulePartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalSchedule)
    );
  }

  /**
   * The professional schedule viewset.
   * @param id A unique integer value identifying this professional schedule.
   */
  accountsProfessionalScheduleDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-schedule/${encodeURIComponent(id)}/`,
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
   * The professional schedule viewset.
   * @param id A unique integer value identifying this professional schedule.
   */
  accountsProfessionalScheduleDelete(id: number): __Observable<null> {
    return this.accountsProfessionalScheduleDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalTagsListResponse(params: AccountsService.AccountsProfessionalTagsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTag>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-tags/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTag>}>;
      })
    );
  }
  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalTagsList(params: AccountsService.AccountsProfessionalTagsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTag>}> {
    return this.accountsProfessionalTagsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTag>})
    );
  }

  /**
   * The professional tag viewset.
   * @param data undefined
   */
  accountsProfessionalTagsCreateResponse(data: ProfessionalTag): __Observable<__StrictHttpResponse<ProfessionalTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professional-tags/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalTag>;
      })
    );
  }
  /**
   * The professional tag viewset.
   * @param data undefined
   */
  accountsProfessionalTagsCreate(data: ProfessionalTag): __Observable<ProfessionalTag> {
    return this.accountsProfessionalTagsCreateResponse(data).pipe(
      __map(_r => _r.body as ProfessionalTag)
    );
  }

  /**
   * The professional tag viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  accountsProfessionalTagsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professional-tags/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalTag>;
      })
    );
  }
  /**
   * The professional tag viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  accountsProfessionalTagsRead(id: number): __Observable<ProfessionalTag> {
    return this.accountsProfessionalTagsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalTag)
    );
  }

  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional tag.
   *
   * - `data`:
   */
  accountsProfessionalTagsUpdateResponse(params: AccountsService.AccountsProfessionalTagsUpdateParams): __Observable<__StrictHttpResponse<ProfessionalTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professional-tags/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalTag>;
      })
    );
  }
  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional tag.
   *
   * - `data`:
   */
  accountsProfessionalTagsUpdate(params: AccountsService.AccountsProfessionalTagsUpdateParams): __Observable<ProfessionalTag> {
    return this.accountsProfessionalTagsUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalTag)
    );
  }

  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional tag.
   *
   * - `data`:
   */
  accountsProfessionalTagsPartialUpdateResponse(params: AccountsService.AccountsProfessionalTagsPartialUpdateParams): __Observable<__StrictHttpResponse<ProfessionalTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professional-tags/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalTag>;
      })
    );
  }
  /**
   * The professional tag viewset.
   * @param params The `AccountsService.AccountsProfessionalTagsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional tag.
   *
   * - `data`:
   */
  accountsProfessionalTagsPartialUpdate(params: AccountsService.AccountsProfessionalTagsPartialUpdateParams): __Observable<ProfessionalTag> {
    return this.accountsProfessionalTagsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ProfessionalTag)
    );
  }

  /**
   * The professional tag viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  accountsProfessionalTagsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professional-tags/${encodeURIComponent(id)}/`,
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
   * The professional tag viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  accountsProfessionalTagsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalTagsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalsListResponse(params: AccountsService.AccountsProfessionalsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Professional>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professionals/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Professional>}>;
      })
    );
  }
  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsProfessionalsList(params: AccountsService.AccountsProfessionalsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Professional>}> {
    return this.accountsProfessionalsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Professional>})
    );
  }

  /**
   * The professional viewset.
   * @param data undefined
   */
  accountsProfessionalsCreateResponse(data: Professional): __Observable<__StrictHttpResponse<Professional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professionals/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Professional>;
      })
    );
  }
  /**
   * The professional viewset.
   * @param data undefined
   */
  accountsProfessionalsCreate(data: Professional): __Observable<Professional> {
    return this.accountsProfessionalsCreateResponse(data).pipe(
      __map(_r => _r.body as Professional)
    );
  }

  /**
   * Return true if user can review professional.
   * @param id undefined
   */
  accountsProfessionalsCanReviewReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professionals/can-review/${encodeURIComponent(id)}/`,
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
   * Return true if user can review professional.
   * @param id undefined
   */
  accountsProfessionalsCanReviewRead(id: string): __Observable<null> {
    return this.accountsProfessionalsCanReviewReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The professional viewset.
   * @param id A unique integer value identifying this professional.
   */
  accountsProfessionalsReadResponse(id: number): __Observable<__StrictHttpResponse<Professional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/professionals/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Professional>;
      })
    );
  }
  /**
   * The professional viewset.
   * @param id A unique integer value identifying this professional.
   */
  accountsProfessionalsRead(id: number): __Observable<Professional> {
    return this.accountsProfessionalsReadResponse(id).pipe(
      __map(_r => _r.body as Professional)
    );
  }

  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsUpdateResponse(params: AccountsService.AccountsProfessionalsUpdateParams): __Observable<__StrictHttpResponse<Professional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/professionals/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Professional>;
      })
    );
  }
  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsUpdate(params: AccountsService.AccountsProfessionalsUpdateParams): __Observable<Professional> {
    return this.accountsProfessionalsUpdateResponse(params).pipe(
      __map(_r => _r.body as Professional)
    );
  }

  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsPartialUpdateResponse(params: AccountsService.AccountsProfessionalsPartialUpdateParams): __Observable<__StrictHttpResponse<Professional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/professionals/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Professional>;
      })
    );
  }
  /**
   * The professional viewset.
   * @param params The `AccountsService.AccountsProfessionalsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsPartialUpdate(params: AccountsService.AccountsProfessionalsPartialUpdateParams): __Observable<Professional> {
    return this.accountsProfessionalsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as Professional)
    );
  }

  /**
   * Delete model action.
   * @param id A unique integer value identifying this professional.
   */
  accountsProfessionalsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/professionals/${encodeURIComponent(id)}/`,
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
   * Delete model action.
   * @param id A unique integer value identifying this professional.
   */
  accountsProfessionalsDelete(id: number): __Observable<null> {
    return this.accountsProfessionalsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Generate the professional calendar.
   * @param params The `AccountsService.AccountsProfessionalsGenerateCalendarParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsGenerateCalendarResponse(params: AccountsService.AccountsProfessionalsGenerateCalendarParams): __Observable<__StrictHttpResponse<Professional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/professionals/${encodeURIComponent(params.id)}/generate_calendar/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Professional>;
      })
    );
  }
  /**
   * Generate the professional calendar.
   * @param params The `AccountsService.AccountsProfessionalsGenerateCalendarParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this professional.
   *
   * - `data`:
   */
  accountsProfessionalsGenerateCalendar(params: AccountsService.AccountsProfessionalsGenerateCalendarParams): __Observable<Professional> {
    return this.accountsProfessionalsGenerateCalendarResponse(params).pipe(
      __map(_r => _r.body as Professional)
    );
  }

  /**
   * Get or set user profile.
   */
  accountsProfileListResponse(): __Observable<__StrictHttpResponse<Array<Profile>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/profile/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Profile>>;
      })
    );
  }
  /**
   * Get or set user profile.
   */
  accountsProfileList(): __Observable<Array<Profile>> {
    return this.accountsProfileListResponse().pipe(
      __map(_r => _r.body as Array<Profile>)
    );
  }

  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfileCreateResponse(data: Profile): __Observable<__StrictHttpResponse<Profile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/profile/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Profile>;
      })
    );
  }
  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfileCreate(data: Profile): __Observable<Profile> {
    return this.accountsProfileCreateResponse(data).pipe(
      __map(_r => _r.body as Profile)
    );
  }

  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfileUpdateResponse(data: Profile): __Observable<__StrictHttpResponse<Profile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/profile/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Profile>;
      })
    );
  }
  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfileUpdate(data: Profile): __Observable<Profile> {
    return this.accountsProfileUpdateResponse(data).pipe(
      __map(_r => _r.body as Profile)
    );
  }

  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfilePartialUpdateResponse(data: Profile): __Observable<__StrictHttpResponse<Profile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/profile/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Profile>;
      })
    );
  }
  /**
   * Get or set user profile.
   * @param data undefined
   */
  accountsProfilePartialUpdate(data: Profile): __Observable<Profile> {
    return this.accountsProfilePartialUpdateResponse(data).pipe(
      __map(_r => _r.body as Profile)
    );
  }

  /**
   * Register new email.
   * @param data undefined
   */
  accountsRegisterEmailCreateResponse(data: DefaultRegisterEmail): __Observable<__StrictHttpResponse<DefaultRegisterEmail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/register-email/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DefaultRegisterEmail>;
      })
    );
  }
  /**
   * Register new email.
   * @param data undefined
   */
  accountsRegisterEmailCreate(data: DefaultRegisterEmail): __Observable<DefaultRegisterEmail> {
    return this.accountsRegisterEmailCreateResponse(data).pipe(
      __map(_r => _r.body as DefaultRegisterEmail)
    );
  }

  /**
   * Register new user.
   * @param data undefined
   */
  accountsRegisterCreateResponse(data: DefaultRegisterUser): __Observable<__StrictHttpResponse<DefaultRegisterUser>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/register/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DefaultRegisterUser>;
      })
    );
  }
  /**
   * Register new user.
   * @param data undefined
   */
  accountsRegisterCreate(data: DefaultRegisterUser): __Observable<DefaultRegisterUser> {
    return this.accountsRegisterCreateResponse(data).pipe(
      __map(_r => _r.body as DefaultRegisterUser)
    );
  }

  /**
   * Resend a registration verification email.
   */
  accountsResendVerifyRegistrationCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/resend-verify-registration`,
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
   * Resend a registration verification email.
   */
  accountsResendVerifyRegistrationCreate(): __Observable<null> {
    return this.accountsResendVerifyRegistrationCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Reset password, given the signature and timestamp from the link.
   * @param data undefined
   */
  accountsResetPasswordCreateResponse(data: ResetPassword): __Observable<__StrictHttpResponse<ResetPassword>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/reset-password/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResetPassword>;
      })
    );
  }
  /**
   * Reset password, given the signature and timestamp from the link.
   * @param data undefined
   */
  accountsResetPasswordCreate(data: ResetPassword): __Observable<ResetPassword> {
    return this.accountsResetPasswordCreateResponse(data).pipe(
      __map(_r => _r.body as ResetPassword)
    );
  }

  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `review`:
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
  accountsReviewCommentsListResponse(params: AccountsService.AccountsReviewCommentsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewComment>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.review != null) __params = __params.set('review', params.review.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.modified != null) __params = __params.set('modified', params.modified.toString());
    if (params.created != null) __params = __params.set('created', params.created.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/review-comments/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewComment>}>;
      })
    );
  }
  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `review`:
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
  accountsReviewCommentsList(params: AccountsService.AccountsReviewCommentsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ReviewComment>}> {
    return this.accountsReviewCommentsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ReviewComment>})
    );
  }

  /**
   * The user review comment viewset.
   * @param data undefined
   */
  accountsReviewCommentsCreateResponse(data: ReviewComment): __Observable<__StrictHttpResponse<ReviewComment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/review-comments/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewComment>;
      })
    );
  }
  /**
   * The user review comment viewset.
   * @param data undefined
   */
  accountsReviewCommentsCreate(data: ReviewComment): __Observable<ReviewComment> {
    return this.accountsReviewCommentsCreateResponse(data).pipe(
      __map(_r => _r.body as ReviewComment)
    );
  }

  /**
   * The user review comment viewset.
   * @param id A unique integer value identifying this review comment.
   */
  accountsReviewCommentsReadResponse(id: number): __Observable<__StrictHttpResponse<ReviewComment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/review-comments/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewComment>;
      })
    );
  }
  /**
   * The user review comment viewset.
   * @param id A unique integer value identifying this review comment.
   */
  accountsReviewCommentsRead(id: number): __Observable<ReviewComment> {
    return this.accountsReviewCommentsReadResponse(id).pipe(
      __map(_r => _r.body as ReviewComment)
    );
  }

  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review comment.
   *
   * - `data`:
   */
  accountsReviewCommentsUpdateResponse(params: AccountsService.AccountsReviewCommentsUpdateParams): __Observable<__StrictHttpResponse<ReviewComment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/review-comments/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewComment>;
      })
    );
  }
  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review comment.
   *
   * - `data`:
   */
  accountsReviewCommentsUpdate(params: AccountsService.AccountsReviewCommentsUpdateParams): __Observable<ReviewComment> {
    return this.accountsReviewCommentsUpdateResponse(params).pipe(
      __map(_r => _r.body as ReviewComment)
    );
  }

  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review comment.
   *
   * - `data`:
   */
  accountsReviewCommentsPartialUpdateResponse(params: AccountsService.AccountsReviewCommentsPartialUpdateParams): __Observable<__StrictHttpResponse<ReviewComment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/review-comments/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReviewComment>;
      })
    );
  }
  /**
   * The user review comment viewset.
   * @param params The `AccountsService.AccountsReviewCommentsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review comment.
   *
   * - `data`:
   */
  accountsReviewCommentsPartialUpdate(params: AccountsService.AccountsReviewCommentsPartialUpdateParams): __Observable<ReviewComment> {
    return this.accountsReviewCommentsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ReviewComment)
    );
  }

  /**
   * The user review comment viewset.
   * @param id A unique integer value identifying this review comment.
   */
  accountsReviewCommentsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/review-comments/${encodeURIComponent(id)}/`,
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
   * The user review comment viewset.
   * @param id A unique integer value identifying this review comment.
   */
  accountsReviewCommentsDelete(id: number): __Observable<null> {
    return this.accountsReviewCommentsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsListParams` containing the following parameters:
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
  accountsReviewsListResponse(params: AccountsService.AccountsReviewsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Review>}>> {
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
      this.rootUrl + `/accounts/reviews/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Review>}>;
      })
    );
  }
  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsListParams` containing the following parameters:
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
  accountsReviewsList(params: AccountsService.AccountsReviewsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Review>}> {
    return this.accountsReviewsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Review>})
    );
  }

  /**
   * The user review viewset.
   * @param data undefined
   */
  accountsReviewsCreateResponse(data: Review): __Observable<__StrictHttpResponse<Review>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/reviews/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Review>;
      })
    );
  }
  /**
   * The user review viewset.
   * @param data undefined
   */
  accountsReviewsCreate(data: Review): __Observable<Review> {
    return this.accountsReviewsCreateResponse(data).pipe(
      __map(_r => _r.body as Review)
    );
  }

  /**
   * The user review viewset.
   * @param id A unique integer value identifying this review.
   */
  accountsReviewsReadResponse(id: number): __Observable<__StrictHttpResponse<Review>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/reviews/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Review>;
      })
    );
  }
  /**
   * The user review viewset.
   * @param id A unique integer value identifying this review.
   */
  accountsReviewsRead(id: number): __Observable<Review> {
    return this.accountsReviewsReadResponse(id).pipe(
      __map(_r => _r.body as Review)
    );
  }

  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review.
   *
   * - `data`:
   */
  accountsReviewsUpdateResponse(params: AccountsService.AccountsReviewsUpdateParams): __Observable<__StrictHttpResponse<Review>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/reviews/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Review>;
      })
    );
  }
  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review.
   *
   * - `data`:
   */
  accountsReviewsUpdate(params: AccountsService.AccountsReviewsUpdateParams): __Observable<Review> {
    return this.accountsReviewsUpdateResponse(params).pipe(
      __map(_r => _r.body as Review)
    );
  }

  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review.
   *
   * - `data`:
   */
  accountsReviewsPartialUpdateResponse(params: AccountsService.AccountsReviewsPartialUpdateParams): __Observable<__StrictHttpResponse<Review>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/reviews/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Review>;
      })
    );
  }
  /**
   * The user review viewset.
   * @param params The `AccountsService.AccountsReviewsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this review.
   *
   * - `data`:
   */
  accountsReviewsPartialUpdate(params: AccountsService.AccountsReviewsPartialUpdateParams): __Observable<Review> {
    return this.accountsReviewsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as Review)
    );
  }

  /**
   * The user review viewset.
   * @param id A unique integer value identifying this review.
   */
  accountsReviewsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/reviews/${encodeURIComponent(id)}/`,
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
   * The user review viewset.
   * @param id A unique integer value identifying this review.
   */
  accountsReviewsDelete(id: number): __Observable<null> {
    return this.accountsReviewsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsSavedProfessionalsListResponse(params: AccountsService.AccountsSavedProfessionalsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserSavedProfessional>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/saved-professionals/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserSavedProfessional>}>;
      })
    );
  }
  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsSavedProfessionalsList(params: AccountsService.AccountsSavedProfessionalsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserSavedProfessional>}> {
    return this.accountsSavedProfessionalsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserSavedProfessional>})
    );
  }

  /**
   * The user saved professional viewset.
   * @param data undefined
   */
  accountsSavedProfessionalsCreateResponse(data: UserSavedProfessional): __Observable<__StrictHttpResponse<UserSavedProfessional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/saved-professionals/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSavedProfessional>;
      })
    );
  }
  /**
   * The user saved professional viewset.
   * @param data undefined
   */
  accountsSavedProfessionalsCreate(data: UserSavedProfessional): __Observable<UserSavedProfessional> {
    return this.accountsSavedProfessionalsCreateResponse(data).pipe(
      __map(_r => _r.body as UserSavedProfessional)
    );
  }

  /**
   * The user saved professional viewset.
   * @param id A unique integer value identifying this user saved professional.
   */
  accountsSavedProfessionalsReadResponse(id: number): __Observable<__StrictHttpResponse<UserSavedProfessional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/saved-professionals/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSavedProfessional>;
      })
    );
  }
  /**
   * The user saved professional viewset.
   * @param id A unique integer value identifying this user saved professional.
   */
  accountsSavedProfessionalsRead(id: number): __Observable<UserSavedProfessional> {
    return this.accountsSavedProfessionalsReadResponse(id).pipe(
      __map(_r => _r.body as UserSavedProfessional)
    );
  }

  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user saved professional.
   *
   * - `data`:
   */
  accountsSavedProfessionalsUpdateResponse(params: AccountsService.AccountsSavedProfessionalsUpdateParams): __Observable<__StrictHttpResponse<UserSavedProfessional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/saved-professionals/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSavedProfessional>;
      })
    );
  }
  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user saved professional.
   *
   * - `data`:
   */
  accountsSavedProfessionalsUpdate(params: AccountsService.AccountsSavedProfessionalsUpdateParams): __Observable<UserSavedProfessional> {
    return this.accountsSavedProfessionalsUpdateResponse(params).pipe(
      __map(_r => _r.body as UserSavedProfessional)
    );
  }

  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user saved professional.
   *
   * - `data`:
   */
  accountsSavedProfessionalsPartialUpdateResponse(params: AccountsService.AccountsSavedProfessionalsPartialUpdateParams): __Observable<__StrictHttpResponse<UserSavedProfessional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/saved-professionals/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSavedProfessional>;
      })
    );
  }
  /**
   * The user saved professional viewset.
   * @param params The `AccountsService.AccountsSavedProfessionalsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user saved professional.
   *
   * - `data`:
   */
  accountsSavedProfessionalsPartialUpdate(params: AccountsService.AccountsSavedProfessionalsPartialUpdateParams): __Observable<UserSavedProfessional> {
    return this.accountsSavedProfessionalsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as UserSavedProfessional)
    );
  }

  /**
   * The user saved professional viewset.
   * @param id A unique integer value identifying this user saved professional.
   */
  accountsSavedProfessionalsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/saved-professionals/${encodeURIComponent(id)}/`,
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
   * The user saved professional viewset.
   * @param id A unique integer value identifying this user saved professional.
   */
  accountsSavedProfessionalsDelete(id: number): __Observable<null> {
    return this.accountsSavedProfessionalsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Send email with reset password link.
   * @param data undefined
   */
  accountsSendResetPasswordLinkCreateResponse(data: DefaultSendResetPasswordLink): __Observable<__StrictHttpResponse<DefaultSendResetPasswordLink>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/send-reset-password-link/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DefaultSendResetPasswordLink>;
      })
    );
  }
  /**
   * Send email with reset password link.
   * @param data undefined
   */
  accountsSendResetPasswordLinkCreate(data: DefaultSendResetPasswordLink): __Observable<DefaultSendResetPasswordLink> {
    return this.accountsSendResetPasswordLinkCreateResponse(data).pipe(
      __map(_r => _r.body as DefaultSendResetPasswordLink)
    );
  }

  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsListParams` containing the following parameters:
   *
   * - `service`:
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
  accountsServiceClosedPeriodsListResponse(params: AccountsService.AccountsServiceClosedPeriodsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceClosedPeriod>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-closed-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceClosedPeriod>}>;
      })
    );
  }
  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsListParams` containing the following parameters:
   *
   * - `service`:
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
  accountsServiceClosedPeriodsList(params: AccountsService.AccountsServiceClosedPeriodsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceClosedPeriod>}> {
    return this.accountsServiceClosedPeriodsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServiceClosedPeriod>})
    );
  }

  /**
   * The service closed period viewset.
   * @param data undefined
   */
  accountsServiceClosedPeriodsCreateResponse(data: ServiceClosedPeriod): __Observable<__StrictHttpResponse<ServiceClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-closed-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceClosedPeriod>;
      })
    );
  }
  /**
   * The service closed period viewset.
   * @param data undefined
   */
  accountsServiceClosedPeriodsCreate(data: ServiceClosedPeriod): __Observable<ServiceClosedPeriod> {
    return this.accountsServiceClosedPeriodsCreateResponse(data).pipe(
      __map(_r => _r.body as ServiceClosedPeriod)
    );
  }

  /**
   * The service closed period viewset.
   * @param id A unique integer value identifying this service closed period.
   */
  accountsServiceClosedPeriodsReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-closed-periods/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceClosedPeriod>;
      })
    );
  }
  /**
   * The service closed period viewset.
   * @param id A unique integer value identifying this service closed period.
   */
  accountsServiceClosedPeriodsRead(id: number): __Observable<ServiceClosedPeriod> {
    return this.accountsServiceClosedPeriodsReadResponse(id).pipe(
      __map(_r => _r.body as ServiceClosedPeriod)
    );
  }

  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service closed period.
   *
   * - `data`:
   */
  accountsServiceClosedPeriodsUpdateResponse(params: AccountsService.AccountsServiceClosedPeriodsUpdateParams): __Observable<__StrictHttpResponse<ServiceClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-closed-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceClosedPeriod>;
      })
    );
  }
  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service closed period.
   *
   * - `data`:
   */
  accountsServiceClosedPeriodsUpdate(params: AccountsService.AccountsServiceClosedPeriodsUpdateParams): __Observable<ServiceClosedPeriod> {
    return this.accountsServiceClosedPeriodsUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceClosedPeriod)
    );
  }

  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service closed period.
   *
   * - `data`:
   */
  accountsServiceClosedPeriodsPartialUpdateResponse(params: AccountsService.AccountsServiceClosedPeriodsPartialUpdateParams): __Observable<__StrictHttpResponse<ServiceClosedPeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-closed-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceClosedPeriod>;
      })
    );
  }
  /**
   * The service closed period viewset.
   * @param params The `AccountsService.AccountsServiceClosedPeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service closed period.
   *
   * - `data`:
   */
  accountsServiceClosedPeriodsPartialUpdate(params: AccountsService.AccountsServiceClosedPeriodsPartialUpdateParams): __Observable<ServiceClosedPeriod> {
    return this.accountsServiceClosedPeriodsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceClosedPeriod)
    );
  }

  /**
   * The service closed period viewset.
   * @param id A unique integer value identifying this service closed period.
   */
  accountsServiceClosedPeriodsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-closed-periods/${encodeURIComponent(id)}/`,
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
   * The service closed period viewset.
   * @param id A unique integer value identifying this service closed period.
   */
  accountsServiceClosedPeriodsDelete(id: number): __Observable<null> {
    return this.accountsServiceClosedPeriodsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServiceLocationsListResponse(params: AccountsService.AccountsServiceLocationsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceLocation>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceLocation>}>;
      })
    );
  }
  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServiceLocationsList(params: AccountsService.AccountsServiceLocationsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceLocation>}> {
    return this.accountsServiceLocationsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServiceLocation>})
    );
  }

  /**
   * The service location viewset.
   * @param data undefined
   */
  accountsServiceLocationsCreateResponse(data: ServiceLocation): __Observable<__StrictHttpResponse<ServiceLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-locations/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceLocation>;
      })
    );
  }
  /**
   * The service location viewset.
   * @param data undefined
   */
  accountsServiceLocationsCreate(data: ServiceLocation): __Observable<ServiceLocation> {
    return this.accountsServiceLocationsCreateResponse(data).pipe(
      __map(_r => _r.body as ServiceLocation)
    );
  }

  /**
   * The service location viewset.
   * @param id A unique integer value identifying this service location.
   */
  accountsServiceLocationsReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-locations/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceLocation>;
      })
    );
  }
  /**
   * The service location viewset.
   * @param id A unique integer value identifying this service location.
   */
  accountsServiceLocationsRead(id: number): __Observable<ServiceLocation> {
    return this.accountsServiceLocationsReadResponse(id).pipe(
      __map(_r => _r.body as ServiceLocation)
    );
  }

  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service location.
   *
   * - `data`:
   */
  accountsServiceLocationsUpdateResponse(params: AccountsService.AccountsServiceLocationsUpdateParams): __Observable<__StrictHttpResponse<ServiceLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceLocation>;
      })
    );
  }
  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service location.
   *
   * - `data`:
   */
  accountsServiceLocationsUpdate(params: AccountsService.AccountsServiceLocationsUpdateParams): __Observable<ServiceLocation> {
    return this.accountsServiceLocationsUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceLocation)
    );
  }

  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service location.
   *
   * - `data`:
   */
  accountsServiceLocationsPartialUpdateResponse(params: AccountsService.AccountsServiceLocationsPartialUpdateParams): __Observable<__StrictHttpResponse<ServiceLocation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-locations/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceLocation>;
      })
    );
  }
  /**
   * The service location viewset.
   * @param params The `AccountsService.AccountsServiceLocationsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service location.
   *
   * - `data`:
   */
  accountsServiceLocationsPartialUpdate(params: AccountsService.AccountsServiceLocationsPartialUpdateParams): __Observable<ServiceLocation> {
    return this.accountsServiceLocationsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceLocation)
    );
  }

  /**
   * The service location viewset.
   * @param id A unique integer value identifying this service location.
   */
  accountsServiceLocationsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-locations/${encodeURIComponent(id)}/`,
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
   * The service location viewset.
   * @param id A unique integer value identifying this service location.
   */
  accountsServiceLocationsDelete(id: number): __Observable<null> {
    return this.accountsServiceLocationsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServicePhotosListResponse(params: AccountsService.AccountsServicePhotosListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServicePhoto>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-photos/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServicePhoto>}>;
      })
    );
  }
  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServicePhotosList(params: AccountsService.AccountsServicePhotosListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServicePhoto>}> {
    return this.accountsServicePhotosListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServicePhoto>})
    );
  }

  /**
   * The service photo viewset.
   * @param data undefined
   */
  accountsServicePhotosCreateResponse(data: ServicePhoto): __Observable<__StrictHttpResponse<ServicePhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-photos/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServicePhoto>;
      })
    );
  }
  /**
   * The service photo viewset.
   * @param data undefined
   */
  accountsServicePhotosCreate(data: ServicePhoto): __Observable<ServicePhoto> {
    return this.accountsServicePhotosCreateResponse(data).pipe(
      __map(_r => _r.body as ServicePhoto)
    );
  }

  /**
   * The service photo viewset.
   * @param id A unique integer value identifying this service photo.
   */
  accountsServicePhotosReadResponse(id: number): __Observable<__StrictHttpResponse<ServicePhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-photos/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServicePhoto>;
      })
    );
  }
  /**
   * The service photo viewset.
   * @param id A unique integer value identifying this service photo.
   */
  accountsServicePhotosRead(id: number): __Observable<ServicePhoto> {
    return this.accountsServicePhotosReadResponse(id).pipe(
      __map(_r => _r.body as ServicePhoto)
    );
  }

  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service photo.
   *
   * - `data`:
   */
  accountsServicePhotosUpdateResponse(params: AccountsService.AccountsServicePhotosUpdateParams): __Observable<__StrictHttpResponse<ServicePhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-photos/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServicePhoto>;
      })
    );
  }
  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service photo.
   *
   * - `data`:
   */
  accountsServicePhotosUpdate(params: AccountsService.AccountsServicePhotosUpdateParams): __Observable<ServicePhoto> {
    return this.accountsServicePhotosUpdateResponse(params).pipe(
      __map(_r => _r.body as ServicePhoto)
    );
  }

  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service photo.
   *
   * - `data`:
   */
  accountsServicePhotosPartialUpdateResponse(params: AccountsService.AccountsServicePhotosPartialUpdateParams): __Observable<__StrictHttpResponse<ServicePhoto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-photos/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServicePhoto>;
      })
    );
  }
  /**
   * The service photo viewset.
   * @param params The `AccountsService.AccountsServicePhotosPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service photo.
   *
   * - `data`:
   */
  accountsServicePhotosPartialUpdate(params: AccountsService.AccountsServicePhotosPartialUpdateParams): __Observable<ServicePhoto> {
    return this.accountsServicePhotosPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServicePhoto)
    );
  }

  /**
   * The service photo viewset.
   * @param id A unique integer value identifying this service photo.
   */
  accountsServicePhotosDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-photos/${encodeURIComponent(id)}/`,
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
   * The service photo viewset.
   * @param id A unique integer value identifying this service photo.
   */
  accountsServicePhotosDelete(id: number): __Observable<null> {
    return this.accountsServicePhotosDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_price_fixed`:
   */
  accountsServicePricesListResponse(params: AccountsService.AccountsServicePricesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Price>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isPriceFixed != null) __params = __params.set('is_price_fixed', params.isPriceFixed.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-prices/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Price>}>;
      })
    );
  }
  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_price_fixed`:
   */
  accountsServicePricesList(params: AccountsService.AccountsServicePricesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Price>}> {
    return this.accountsServicePricesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Price>})
    );
  }

  /**
   * The price viewset.
   * @param data undefined
   */
  accountsServicePricesCreateResponse(data: Price): __Observable<__StrictHttpResponse<Price>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-prices/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Price>;
      })
    );
  }
  /**
   * The price viewset.
   * @param data undefined
   */
  accountsServicePricesCreate(data: Price): __Observable<Price> {
    return this.accountsServicePricesCreateResponse(data).pipe(
      __map(_r => _r.body as Price)
    );
  }

  /**
   * The price viewset.
   * @param id A unique integer value identifying this price.
   */
  accountsServicePricesReadResponse(id: number): __Observable<__StrictHttpResponse<Price>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-prices/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Price>;
      })
    );
  }
  /**
   * The price viewset.
   * @param id A unique integer value identifying this price.
   */
  accountsServicePricesRead(id: number): __Observable<Price> {
    return this.accountsServicePricesReadResponse(id).pipe(
      __map(_r => _r.body as Price)
    );
  }

  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this price.
   *
   * - `data`:
   */
  accountsServicePricesUpdateResponse(params: AccountsService.AccountsServicePricesUpdateParams): __Observable<__StrictHttpResponse<Price>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-prices/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Price>;
      })
    );
  }
  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this price.
   *
   * - `data`:
   */
  accountsServicePricesUpdate(params: AccountsService.AccountsServicePricesUpdateParams): __Observable<Price> {
    return this.accountsServicePricesUpdateResponse(params).pipe(
      __map(_r => _r.body as Price)
    );
  }

  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this price.
   *
   * - `data`:
   */
  accountsServicePricesPartialUpdateResponse(params: AccountsService.AccountsServicePricesPartialUpdateParams): __Observable<__StrictHttpResponse<Price>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-prices/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Price>;
      })
    );
  }
  /**
   * The price viewset.
   * @param params The `AccountsService.AccountsServicePricesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this price.
   *
   * - `data`:
   */
  accountsServicePricesPartialUpdate(params: AccountsService.AccountsServicePricesPartialUpdateParams): __Observable<Price> {
    return this.accountsServicePricesPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as Price)
    );
  }

  /**
   * The price viewset.
   * @param id A unique integer value identifying this price.
   */
  accountsServicePricesDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-prices/${encodeURIComponent(id)}/`,
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
   * The price viewset.
   * @param id A unique integer value identifying this price.
   */
  accountsServicePricesDelete(id: number): __Observable<null> {
    return this.accountsServicePricesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsListParams` containing the following parameters:
   *
   * - `start_date`:
   *
   * - `service`:
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
   *
   * - `end_date`:
   */
  accountsServiceSchedulePeriodsListResponse(params: AccountsService.AccountsServiceSchedulePeriodsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedulePeriod>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startDate != null) __params = __params.set('start_date', params.startDate.toString());
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    if (params.endDate != null) __params = __params.set('end_date', params.endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-schedule-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedulePeriod>}>;
      })
    );
  }
  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsListParams` containing the following parameters:
   *
   * - `start_date`:
   *
   * - `service`:
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
   *
   * - `end_date`:
   */
  accountsServiceSchedulePeriodsList(params: AccountsService.AccountsServiceSchedulePeriodsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedulePeriod>}> {
    return this.accountsServiceSchedulePeriodsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedulePeriod>})
    );
  }

  /**
   * The service schedule period viewset.
   * @param data undefined
   */
  accountsServiceSchedulePeriodsCreateResponse(data: ServiceSchedulePeriod): __Observable<__StrictHttpResponse<ServiceSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-schedule-periods/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedulePeriod>;
      })
    );
  }
  /**
   * The service schedule period viewset.
   * @param data undefined
   */
  accountsServiceSchedulePeriodsCreate(data: ServiceSchedulePeriod): __Observable<ServiceSchedulePeriod> {
    return this.accountsServiceSchedulePeriodsCreateResponse(data).pipe(
      __map(_r => _r.body as ServiceSchedulePeriod)
    );
  }

  /**
   * The service schedule period viewset.
   * @param id A unique integer value identifying this service schedule period.
   */
  accountsServiceSchedulePeriodsReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-schedule-periods/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedulePeriod>;
      })
    );
  }
  /**
   * The service schedule period viewset.
   * @param id A unique integer value identifying this service schedule period.
   */
  accountsServiceSchedulePeriodsRead(id: number): __Observable<ServiceSchedulePeriod> {
    return this.accountsServiceSchedulePeriodsReadResponse(id).pipe(
      __map(_r => _r.body as ServiceSchedulePeriod)
    );
  }

  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule period.
   *
   * - `data`:
   */
  accountsServiceSchedulePeriodsUpdateResponse(params: AccountsService.AccountsServiceSchedulePeriodsUpdateParams): __Observable<__StrictHttpResponse<ServiceSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-schedule-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedulePeriod>;
      })
    );
  }
  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule period.
   *
   * - `data`:
   */
  accountsServiceSchedulePeriodsUpdate(params: AccountsService.AccountsServiceSchedulePeriodsUpdateParams): __Observable<ServiceSchedulePeriod> {
    return this.accountsServiceSchedulePeriodsUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceSchedulePeriod)
    );
  }

  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule period.
   *
   * - `data`:
   */
  accountsServiceSchedulePeriodsPartialUpdateResponse(params: AccountsService.AccountsServiceSchedulePeriodsPartialUpdateParams): __Observable<__StrictHttpResponse<ServiceSchedulePeriod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-schedule-periods/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedulePeriod>;
      })
    );
  }
  /**
   * The service schedule period viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePeriodsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule period.
   *
   * - `data`:
   */
  accountsServiceSchedulePeriodsPartialUpdate(params: AccountsService.AccountsServiceSchedulePeriodsPartialUpdateParams): __Observable<ServiceSchedulePeriod> {
    return this.accountsServiceSchedulePeriodsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceSchedulePeriod)
    );
  }

  /**
   * The service schedule period viewset.
   * @param id A unique integer value identifying this service schedule period.
   */
  accountsServiceSchedulePeriodsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-schedule-periods/${encodeURIComponent(id)}/`,
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
   * The service schedule period viewset.
   * @param id A unique integer value identifying this service schedule period.
   */
  accountsServiceSchedulePeriodsDelete(id: number): __Observable<null> {
    return this.accountsServiceSchedulePeriodsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceScheduleListParams` containing the following parameters:
   *
   * - `service`:
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
   *
   * - `day_of_week`:
   */
  accountsServiceScheduleListResponse(params: AccountsService.AccountsServiceScheduleListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedule>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    if (params.dayOfWeek != null) __params = __params.set('day_of_week', params.dayOfWeek.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-schedule/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedule>}>;
      })
    );
  }
  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceScheduleListParams` containing the following parameters:
   *
   * - `service`:
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
   *
   * - `day_of_week`:
   */
  accountsServiceScheduleList(params: AccountsService.AccountsServiceScheduleListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedule>}> {
    return this.accountsServiceScheduleListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServiceSchedule>})
    );
  }

  /**
   * The service schedule viewset.
   * @param data undefined
   */
  accountsServiceScheduleCreateResponse(data: ServiceSchedule): __Observable<__StrictHttpResponse<ServiceSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-schedule/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedule>;
      })
    );
  }
  /**
   * The service schedule viewset.
   * @param data undefined
   */
  accountsServiceScheduleCreate(data: ServiceSchedule): __Observable<ServiceSchedule> {
    return this.accountsServiceScheduleCreateResponse(data).pipe(
      __map(_r => _r.body as ServiceSchedule)
    );
  }

  /**
   * Set the service schedules.
   * @param data undefined
   */
  accountsServiceScheduleSetResponse(data: Array<ServiceSchedule>): __Observable<__StrictHttpResponse<Array<ServiceSchedule>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-schedule/set/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ServiceSchedule>>;
      })
    );
  }
  /**
   * Set the service schedules.
   * @param data undefined
   */
  accountsServiceScheduleSet(data: Array<ServiceSchedule>): __Observable<Array<ServiceSchedule>> {
    return this.accountsServiceScheduleSetResponse(data).pipe(
      __map(_r => _r.body as Array<ServiceSchedule>)
    );
  }

  /**
   * The service schedule viewset.
   * @param id A unique integer value identifying this service schedule.
   */
  accountsServiceScheduleReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-schedule/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedule>;
      })
    );
  }
  /**
   * The service schedule viewset.
   * @param id A unique integer value identifying this service schedule.
   */
  accountsServiceScheduleRead(id: number): __Observable<ServiceSchedule> {
    return this.accountsServiceScheduleReadResponse(id).pipe(
      __map(_r => _r.body as ServiceSchedule)
    );
  }

  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceScheduleUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule.
   *
   * - `data`:
   */
  accountsServiceScheduleUpdateResponse(params: AccountsService.AccountsServiceScheduleUpdateParams): __Observable<__StrictHttpResponse<ServiceSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-schedule/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedule>;
      })
    );
  }
  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceScheduleUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule.
   *
   * - `data`:
   */
  accountsServiceScheduleUpdate(params: AccountsService.AccountsServiceScheduleUpdateParams): __Observable<ServiceSchedule> {
    return this.accountsServiceScheduleUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceSchedule)
    );
  }

  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule.
   *
   * - `data`:
   */
  accountsServiceSchedulePartialUpdateResponse(params: AccountsService.AccountsServiceSchedulePartialUpdateParams): __Observable<__StrictHttpResponse<ServiceSchedule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-schedule/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceSchedule>;
      })
    );
  }
  /**
   * The service schedule viewset.
   * @param params The `AccountsService.AccountsServiceSchedulePartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service schedule.
   *
   * - `data`:
   */
  accountsServiceSchedulePartialUpdate(params: AccountsService.AccountsServiceSchedulePartialUpdateParams): __Observable<ServiceSchedule> {
    return this.accountsServiceSchedulePartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceSchedule)
    );
  }

  /**
   * The service schedule viewset.
   * @param id A unique integer value identifying this service schedule.
   */
  accountsServiceScheduleDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-schedule/${encodeURIComponent(id)}/`,
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
   * The service schedule viewset.
   * @param id A unique integer value identifying this service schedule.
   */
  accountsServiceScheduleDelete(id: number): __Observable<null> {
    return this.accountsServiceScheduleDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServiceTagsListResponse(params: AccountsService.AccountsServiceTagsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceTag>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.service != null) __params = __params.set('service', params.service.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-tags/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceTag>}>;
      })
    );
  }
  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsListParams` containing the following parameters:
   *
   * - `service`:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsServiceTagsList(params: AccountsService.AccountsServiceTagsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ServiceTag>}> {
    return this.accountsServiceTagsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ServiceTag>})
    );
  }

  /**
   * The service tag viewset.
   * @param data undefined
   */
  accountsServiceTagsCreateResponse(data: ServiceTag): __Observable<__StrictHttpResponse<ServiceTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/service-tags/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTag>;
      })
    );
  }
  /**
   * The service tag viewset.
   * @param data undefined
   */
  accountsServiceTagsCreate(data: ServiceTag): __Observable<ServiceTag> {
    return this.accountsServiceTagsCreateResponse(data).pipe(
      __map(_r => _r.body as ServiceTag)
    );
  }

  /**
   * The service tag viewset.
   * @param id A unique integer value identifying this service tag.
   */
  accountsServiceTagsReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/service-tags/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTag>;
      })
    );
  }
  /**
   * The service tag viewset.
   * @param id A unique integer value identifying this service tag.
   */
  accountsServiceTagsRead(id: number): __Observable<ServiceTag> {
    return this.accountsServiceTagsReadResponse(id).pipe(
      __map(_r => _r.body as ServiceTag)
    );
  }

  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service tag.
   *
   * - `data`:
   */
  accountsServiceTagsUpdateResponse(params: AccountsService.AccountsServiceTagsUpdateParams): __Observable<__StrictHttpResponse<ServiceTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/service-tags/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTag>;
      })
    );
  }
  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service tag.
   *
   * - `data`:
   */
  accountsServiceTagsUpdate(params: AccountsService.AccountsServiceTagsUpdateParams): __Observable<ServiceTag> {
    return this.accountsServiceTagsUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceTag)
    );
  }

  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service tag.
   *
   * - `data`:
   */
  accountsServiceTagsPartialUpdateResponse(params: AccountsService.AccountsServiceTagsPartialUpdateParams): __Observable<__StrictHttpResponse<ServiceTag>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/service-tags/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServiceTag>;
      })
    );
  }
  /**
   * The service tag viewset.
   * @param params The `AccountsService.AccountsServiceTagsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service tag.
   *
   * - `data`:
   */
  accountsServiceTagsPartialUpdate(params: AccountsService.AccountsServiceTagsPartialUpdateParams): __Observable<ServiceTag> {
    return this.accountsServiceTagsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as ServiceTag)
    );
  }

  /**
   * The service tag viewset.
   * @param id A unique integer value identifying this service tag.
   */
  accountsServiceTagsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/service-tags/${encodeURIComponent(id)}/`,
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
   * The service tag viewset.
   * @param id A unique integer value identifying this service tag.
   */
  accountsServiceTagsDelete(id: number): __Observable<null> {
    return this.accountsServiceTagsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `is_base_schedule`:
   */
  accountsServicesListResponse(params: AccountsService.AccountsServicesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Service>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.professional != null) __params = __params.set('professional', params.professional.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
    if (params.isBaseSchedule != null) __params = __params.set('is_base_schedule', params.isBaseSchedule.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/services/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Service>}>;
      })
    );
  }
  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `professional`:
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `is_enabled`:
   *
   * - `is_base_schedule`:
   */
  accountsServicesList(params: AccountsService.AccountsServicesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Service>}> {
    return this.accountsServicesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Service>})
    );
  }

  /**
   * The service viewset.
   * @param data undefined
   */
  accountsServicesCreateResponse(data: Service): __Observable<__StrictHttpResponse<Service>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/services/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Service>;
      })
    );
  }
  /**
   * The service viewset.
   * @param data undefined
   */
  accountsServicesCreate(data: Service): __Observable<Service> {
    return this.accountsServicesCreateResponse(data).pipe(
      __map(_r => _r.body as Service)
    );
  }

  /**
   * The service viewset.
   * @param id A unique integer value identifying this service.
   */
  accountsServicesReadResponse(id: number): __Observable<__StrictHttpResponse<Service>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/services/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Service>;
      })
    );
  }
  /**
   * The service viewset.
   * @param id A unique integer value identifying this service.
   */
  accountsServicesRead(id: number): __Observable<Service> {
    return this.accountsServicesReadResponse(id).pipe(
      __map(_r => _r.body as Service)
    );
  }

  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service.
   *
   * - `data`:
   */
  accountsServicesUpdateResponse(params: AccountsService.AccountsServicesUpdateParams): __Observable<__StrictHttpResponse<Service>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/services/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Service>;
      })
    );
  }
  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service.
   *
   * - `data`:
   */
  accountsServicesUpdate(params: AccountsService.AccountsServicesUpdateParams): __Observable<Service> {
    return this.accountsServicesUpdateResponse(params).pipe(
      __map(_r => _r.body as Service)
    );
  }

  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service.
   *
   * - `data`:
   */
  accountsServicesPartialUpdateResponse(params: AccountsService.AccountsServicesPartialUpdateParams): __Observable<__StrictHttpResponse<Service>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/services/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Service>;
      })
    );
  }
  /**
   * The service viewset.
   * @param params The `AccountsService.AccountsServicesPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this service.
   *
   * - `data`:
   */
  accountsServicesPartialUpdate(params: AccountsService.AccountsServicesPartialUpdateParams): __Observable<Service> {
    return this.accountsServicesPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as Service)
    );
  }

  /**
   * Delete model action.
   * @param id A unique integer value identifying this service.
   */
  accountsServicesDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/services/${encodeURIComponent(id)}/`,
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
   * Delete model action.
   * @param id A unique integer value identifying this service.
   */
  accountsServicesDelete(id: number): __Observable<null> {
    return this.accountsServicesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsSettingsListResponse(params: AccountsService.AccountsSettingsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserSettings>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/settings/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserSettings>}>;
      })
    );
  }
  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  accountsSettingsList(params: AccountsService.AccountsSettingsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserSettings>}> {
    return this.accountsSettingsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserSettings>})
    );
  }

  /**
   * The user settings viewset.
   * @param data undefined
   */
  accountsSettingsCreateResponse(data: UserSettings): __Observable<__StrictHttpResponse<UserSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/settings/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSettings>;
      })
    );
  }
  /**
   * The user settings viewset.
   * @param data undefined
   */
  accountsSettingsCreate(data: UserSettings): __Observable<UserSettings> {
    return this.accountsSettingsCreateResponse(data).pipe(
      __map(_r => _r.body as UserSettings)
    );
  }

  /**
   * The user settings viewset.
   * @param id A unique integer value identifying this user settings.
   */
  accountsSettingsReadResponse(id: number): __Observable<__StrictHttpResponse<UserSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/settings/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSettings>;
      })
    );
  }
  /**
   * The user settings viewset.
   * @param id A unique integer value identifying this user settings.
   */
  accountsSettingsRead(id: number): __Observable<UserSettings> {
    return this.accountsSettingsReadResponse(id).pipe(
      __map(_r => _r.body as UserSettings)
    );
  }

  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user settings.
   *
   * - `data`:
   */
  accountsSettingsUpdateResponse(params: AccountsService.AccountsSettingsUpdateParams): __Observable<__StrictHttpResponse<UserSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/settings/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSettings>;
      })
    );
  }
  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user settings.
   *
   * - `data`:
   */
  accountsSettingsUpdate(params: AccountsService.AccountsSettingsUpdateParams): __Observable<UserSettings> {
    return this.accountsSettingsUpdateResponse(params).pipe(
      __map(_r => _r.body as UserSettings)
    );
  }

  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user settings.
   *
   * - `data`:
   */
  accountsSettingsPartialUpdateResponse(params: AccountsService.AccountsSettingsPartialUpdateParams): __Observable<__StrictHttpResponse<UserSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/accounts/settings/${encodeURIComponent(params.id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSettings>;
      })
    );
  }
  /**
   * The user settings viewset.
   * @param params The `AccountsService.AccountsSettingsPartialUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this user settings.
   *
   * - `data`:
   */
  accountsSettingsPartialUpdate(params: AccountsService.AccountsSettingsPartialUpdateParams): __Observable<UserSettings> {
    return this.accountsSettingsPartialUpdateResponse(params).pipe(
      __map(_r => _r.body as UserSettings)
    );
  }

  /**
   * The user settings viewset.
   * @param id A unique integer value identifying this user settings.
   */
  accountsSettingsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/settings/${encodeURIComponent(id)}/`,
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
   * The user settings viewset.
   * @param id A unique integer value identifying this user settings.
   */
  accountsSettingsDelete(id: number): __Observable<null> {
    return this.accountsSettingsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Verify email via signature.
   * @param data undefined
   */
  accountsVerifyEmailCreateResponse(data: VerifyEmail): __Observable<__StrictHttpResponse<VerifyEmail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/verify-email/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VerifyEmail>;
      })
    );
  }
  /**
   * Verify email via signature.
   * @param data undefined
   */
  accountsVerifyEmailCreate(data: VerifyEmail): __Observable<VerifyEmail> {
    return this.accountsVerifyEmailCreateResponse(data).pipe(
      __map(_r => _r.body as VerifyEmail)
    );
  }

  /**
   * Verify registration via signature.
   * @param data undefined
   */
  accountsVerifyRegistrationCreateResponse(data: VerifyRegistration): __Observable<__StrictHttpResponse<VerifyRegistration>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/verify-registration/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VerifyRegistration>;
      })
    );
  }
  /**
   * Verify registration via signature.
   * @param data undefined
   */
  accountsVerifyRegistrationCreate(data: VerifyRegistration): __Observable<VerifyRegistration> {
    return this.accountsVerifyRegistrationCreateResponse(data).pipe(
      __map(_r => _r.body as VerifyRegistration)
    );
  }
}

module AccountsService {

  /**
   * Parameters for accountsContactsList
   */
  export interface AccountsContactsListParams {

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
    contact?: number;
  }

  /**
   * Parameters for accountsContactsUpdate
   */
  export interface AccountsContactsUpdateParams {

    /**
     * A unique integer value identifying this user contact.
     */
    id: number;
    data: UserContact;
  }

  /**
   * Parameters for accountsContactsPartialUpdate
   */
  export interface AccountsContactsPartialUpdateParams {

    /**
     * A unique integer value identifying this user contact.
     */
    id: number;
    data: UserContact;
  }

  /**
   * Parameters for accountsLanguagesList
   */
  export interface AccountsLanguagesListParams {

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
   * Parameters for accountsLanguagesUpdate
   */
  export interface AccountsLanguagesUpdateParams {

    /**
     * A unique integer value identifying this user language.
     */
    id: number;
    data: UserLanguage;
  }

  /**
   * Parameters for accountsLanguagesPartialUpdate
   */
  export interface AccountsLanguagesPartialUpdateParams {

    /**
     * A unique integer value identifying this user language.
     */
    id: number;
    data: UserLanguage;
  }

  /**
   * Parameters for accountsLocationsList
   */
  export interface AccountsLocationsListParams {

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
  }

  /**
   * Parameters for accountsLocationsUpdate
   */
  export interface AccountsLocationsUpdateParams {

    /**
     * A unique integer value identifying this user location.
     */
    id: number;
    data: UserLocation;
  }

  /**
   * Parameters for accountsLocationsPartialUpdate
   */
  export interface AccountsLocationsPartialUpdateParams {

    /**
     * A unique integer value identifying this user location.
     */
    id: number;
    data: UserLocation;
  }

  /**
   * Parameters for accountsOrderRemindersList
   */
  export interface AccountsOrderRemindersListParams {

    /**
     * A search term.
     */
    search?: string;
    remindBeforeDatetimeLte?: string;
    remindBeforeDatetimeLt?: string;
    remindBeforeDatetimeGte?: string;
    remindBeforeDatetimeGt?: string;
    remindBeforeDatetime?: string;
    remindBeforeLte?: number;
    remindBeforeLt?: number;
    remindBeforeGte?: number;
    remindBeforeGt?: number;
    remindBefore?: number;

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
    isReminded?: string;
  }

  /**
   * Parameters for accountsOrderRemindersUpdate
   */
  export interface AccountsOrderRemindersUpdateParams {

    /**
     * A unique integer value identifying this order reminder.
     */
    id: number;
    data: OrderReminder;
  }

  /**
   * Parameters for accountsOrderRemindersPartialUpdate
   */
  export interface AccountsOrderRemindersPartialUpdateParams {

    /**
     * A unique integer value identifying this order reminder.
     */
    id: number;
    data: OrderReminder;
  }

  /**
   * Parameters for accountsOrdersReceivedList
   */
  export interface AccountsOrdersReceivedListParams {

    /**
     * Multiple values may be separated by commas.
     */
    statusIn?: string;
    startDatetimeLte?: string;
    startDatetimeLt?: string;
    startDatetimeGte?: string;
    startDatetimeGt?: string;
    startDatetime?: string;

    /**
     * Multiple values may be separated by commas.
     */
    sourceIn?: string;
    service?: number;

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
    isAnotherPerson?: string;
    endDatetimeLte?: string;
    endDatetimeLt?: string;
    endDatetimeGte?: string;
    endDatetimeGt?: string;
    endDatetime?: string;
  }

  /**
   * Parameters for accountsOrdersReceivedUpdate
   */
  export interface AccountsOrdersReceivedUpdateParams {

    /**
     * A unique integer value identifying this order.
     */
    id: number;
    data: ReceivedOrder;
  }

  /**
   * Parameters for accountsOrdersReceivedPartialUpdate
   */
  export interface AccountsOrdersReceivedPartialUpdateParams {

    /**
     * A unique integer value identifying this order.
     */
    id: number;
    data: ReceivedOrder;
  }

  /**
   * Parameters for accountsOrdersSentList
   */
  export interface AccountsOrdersSentListParams {

    /**
     * Multiple values may be separated by commas.
     */
    statusIn?: string;
    startDatetimeLte?: string;
    startDatetimeLt?: string;
    startDatetimeGte?: string;
    startDatetimeGt?: string;
    startDatetime?: string;

    /**
     * Multiple values may be separated by commas.
     */
    sourceIn?: string;

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
    isAnotherPerson?: string;
    endDatetimeLte?: string;
    endDatetimeLt?: string;
    endDatetimeGte?: string;
    endDatetimeGt?: string;
    endDatetime?: string;
  }

  /**
   * Parameters for accountsOrdersSentUpdate
   */
  export interface AccountsOrdersSentUpdateParams {

    /**
     * A unique integer value identifying this order.
     */
    id: number;
    data: SentOrder;
  }

  /**
   * Parameters for accountsOrdersSentPartialUpdate
   */
  export interface AccountsOrdersSentPartialUpdateParams {

    /**
     * A unique integer value identifying this order.
     */
    id: number;
    data: SentOrder;
  }

  /**
   * Parameters for accountsProfessionalCertificatesList
   */
  export interface AccountsProfessionalCertificatesListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalCertificatesUpdate
   */
  export interface AccountsProfessionalCertificatesUpdateParams {

    /**
     * A unique integer value identifying this professional certificate.
     */
    id: number;
    data: ProfessionalCertificate;
  }

  /**
   * Parameters for accountsProfessionalCertificatesPartialUpdate
   */
  export interface AccountsProfessionalCertificatesPartialUpdateParams {

    /**
     * A unique integer value identifying this professional certificate.
     */
    id: number;
    data: ProfessionalCertificate;
  }

  /**
   * Parameters for accountsProfessionalClosedPeriodsList
   */
  export interface AccountsProfessionalClosedPeriodsListParams {

    /**
     * A search term.
     */
    search?: string;
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
    isEnabled?: string;
  }

  /**
   * Parameters for accountsProfessionalClosedPeriodsUpdate
   */
  export interface AccountsProfessionalClosedPeriodsUpdateParams {

    /**
     * A unique integer value identifying this professional closed period.
     */
    id: number;
    data: ProfessionalClosedPeriod;
  }

  /**
   * Parameters for accountsProfessionalClosedPeriodsPartialUpdate
   */
  export interface AccountsProfessionalClosedPeriodsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional closed period.
     */
    id: number;
    data: ProfessionalClosedPeriod;
  }

  /**
   * Parameters for accountsProfessionalContactsList
   */
  export interface AccountsProfessionalContactsListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalContactsUpdate
   */
  export interface AccountsProfessionalContactsUpdateParams {

    /**
     * A unique integer value identifying this professional contact.
     */
    id: number;
    data: ProfessionalContact;
  }

  /**
   * Parameters for accountsProfessionalContactsPartialUpdate
   */
  export interface AccountsProfessionalContactsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional contact.
     */
    id: number;
    data: ProfessionalContact;
  }

  /**
   * Parameters for accountsProfessionalEducationsList
   */
  export interface AccountsProfessionalEducationsListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalEducationsUpdate
   */
  export interface AccountsProfessionalEducationsUpdateParams {

    /**
     * A unique integer value identifying this professional education.
     */
    id: number;
    data: ProfessionalEducation;
  }

  /**
   * Parameters for accountsProfessionalEducationsPartialUpdate
   */
  export interface AccountsProfessionalEducationsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional education.
     */
    id: number;
    data: ProfessionalEducation;
  }

  /**
   * Parameters for accountsProfessionalExperienceList
   */
  export interface AccountsProfessionalExperienceListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalExperienceUpdate
   */
  export interface AccountsProfessionalExperienceUpdateParams {

    /**
     * A unique integer value identifying this professional experience.
     */
    id: number;
    data: ProfessionalExperience;
  }

  /**
   * Parameters for accountsProfessionalExperiencePartialUpdate
   */
  export interface AccountsProfessionalExperiencePartialUpdateParams {

    /**
     * A unique integer value identifying this professional experience.
     */
    id: number;
    data: ProfessionalExperience;
  }

  /**
   * Parameters for accountsProfessionalLocationsList
   */
  export interface AccountsProfessionalLocationsListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalLocationsUpdate
   */
  export interface AccountsProfessionalLocationsUpdateParams {

    /**
     * A unique integer value identifying this professional location.
     */
    id: number;
    data: ProfessionalLocation;
  }

  /**
   * Parameters for accountsProfessionalLocationsPartialUpdate
   */
  export interface AccountsProfessionalLocationsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional location.
     */
    id: number;
    data: ProfessionalLocation;
  }

  /**
   * Parameters for accountsProfessionalPhotosList
   */
  export interface AccountsProfessionalPhotosListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalPhotosUpdate
   */
  export interface AccountsProfessionalPhotosUpdateParams {

    /**
     * A unique integer value identifying this professional photo.
     */
    id: number;
    data: ProfessionalPhoto;
  }

  /**
   * Parameters for accountsProfessionalPhotosPartialUpdate
   */
  export interface AccountsProfessionalPhotosPartialUpdateParams {

    /**
     * A unique integer value identifying this professional photo.
     */
    id: number;
    data: ProfessionalPhoto;
  }

  /**
   * Parameters for accountsProfessionalSchedulePeriodsList
   */
  export interface AccountsProfessionalSchedulePeriodsListParams {
    startDate?: string;

    /**
     * A search term.
     */
    search?: string;
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
    isEnabled?: string;
    endDate?: string;
  }

  /**
   * Parameters for accountsProfessionalSchedulePeriodsUpdate
   */
  export interface AccountsProfessionalSchedulePeriodsUpdateParams {

    /**
     * A unique integer value identifying this professional schedule period.
     */
    id: number;
    data: ProfessionalSchedulePeriod;
  }

  /**
   * Parameters for accountsProfessionalSchedulePeriodsPartialUpdate
   */
  export interface AccountsProfessionalSchedulePeriodsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional schedule period.
     */
    id: number;
    data: ProfessionalSchedulePeriod;
  }

  /**
   * Parameters for accountsProfessionalScheduleList
   */
  export interface AccountsProfessionalScheduleListParams {

    /**
     * A search term.
     */
    search?: string;
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
    isEnabled?: string;
    dayOfWeek?: string;
  }

  /**
   * Parameters for accountsProfessionalScheduleUpdate
   */
  export interface AccountsProfessionalScheduleUpdateParams {

    /**
     * A unique integer value identifying this professional schedule.
     */
    id: number;
    data: ProfessionalSchedule;
  }

  /**
   * Parameters for accountsProfessionalSchedulePartialUpdate
   */
  export interface AccountsProfessionalSchedulePartialUpdateParams {

    /**
     * A unique integer value identifying this professional schedule.
     */
    id: number;
    data: ProfessionalSchedule;
  }

  /**
   * Parameters for accountsProfessionalTagsList
   */
  export interface AccountsProfessionalTagsListParams {

    /**
     * A search term.
     */
    search?: string;
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
  }

  /**
   * Parameters for accountsProfessionalTagsUpdate
   */
  export interface AccountsProfessionalTagsUpdateParams {

    /**
     * A unique integer value identifying this professional tag.
     */
    id: number;
    data: ProfessionalTag;
  }

  /**
   * Parameters for accountsProfessionalTagsPartialUpdate
   */
  export interface AccountsProfessionalTagsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional tag.
     */
    id: number;
    data: ProfessionalTag;
  }

  /**
   * Parameters for accountsProfessionalsList
   */
  export interface AccountsProfessionalsListParams {

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
   * Parameters for accountsProfessionalsUpdate
   */
  export interface AccountsProfessionalsUpdateParams {

    /**
     * A unique integer value identifying this professional.
     */
    id: number;
    data: Professional;
  }

  /**
   * Parameters for accountsProfessionalsPartialUpdate
   */
  export interface AccountsProfessionalsPartialUpdateParams {

    /**
     * A unique integer value identifying this professional.
     */
    id: number;
    data: Professional;
  }

  /**
   * Parameters for accountsProfessionalsGenerateCalendar
   */
  export interface AccountsProfessionalsGenerateCalendarParams {

    /**
     * A unique integer value identifying this professional.
     */
    id: number;
    data: Professional;
  }

  /**
   * Parameters for accountsReviewCommentsList
   */
  export interface AccountsReviewCommentsListParams {

    /**
     * A search term.
     */
    search?: string;
    review?: number;

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

  /**
   * Parameters for accountsReviewCommentsUpdate
   */
  export interface AccountsReviewCommentsUpdateParams {

    /**
     * A unique integer value identifying this review comment.
     */
    id: number;
    data: ReviewComment;
  }

  /**
   * Parameters for accountsReviewCommentsPartialUpdate
   */
  export interface AccountsReviewCommentsPartialUpdateParams {

    /**
     * A unique integer value identifying this review comment.
     */
    id: number;
    data: ReviewComment;
  }

  /**
   * Parameters for accountsReviewsList
   */
  export interface AccountsReviewsListParams {

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

  /**
   * Parameters for accountsReviewsUpdate
   */
  export interface AccountsReviewsUpdateParams {

    /**
     * A unique integer value identifying this review.
     */
    id: number;
    data: Review;
  }

  /**
   * Parameters for accountsReviewsPartialUpdate
   */
  export interface AccountsReviewsPartialUpdateParams {

    /**
     * A unique integer value identifying this review.
     */
    id: number;
    data: Review;
  }

  /**
   * Parameters for accountsSavedProfessionalsList
   */
  export interface AccountsSavedProfessionalsListParams {

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
   * Parameters for accountsSavedProfessionalsUpdate
   */
  export interface AccountsSavedProfessionalsUpdateParams {

    /**
     * A unique integer value identifying this user saved professional.
     */
    id: number;
    data: UserSavedProfessional;
  }

  /**
   * Parameters for accountsSavedProfessionalsPartialUpdate
   */
  export interface AccountsSavedProfessionalsPartialUpdateParams {

    /**
     * A unique integer value identifying this user saved professional.
     */
    id: number;
    data: UserSavedProfessional;
  }

  /**
   * Parameters for accountsServiceClosedPeriodsList
   */
  export interface AccountsServiceClosedPeriodsListParams {
    service?: number;

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
   * Parameters for accountsServiceClosedPeriodsUpdate
   */
  export interface AccountsServiceClosedPeriodsUpdateParams {

    /**
     * A unique integer value identifying this service closed period.
     */
    id: number;
    data: ServiceClosedPeriod;
  }

  /**
   * Parameters for accountsServiceClosedPeriodsPartialUpdate
   */
  export interface AccountsServiceClosedPeriodsPartialUpdateParams {

    /**
     * A unique integer value identifying this service closed period.
     */
    id: number;
    data: ServiceClosedPeriod;
  }

  /**
   * Parameters for accountsServiceLocationsList
   */
  export interface AccountsServiceLocationsListParams {
    service?: number;

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
   * Parameters for accountsServiceLocationsUpdate
   */
  export interface AccountsServiceLocationsUpdateParams {

    /**
     * A unique integer value identifying this service location.
     */
    id: number;
    data: ServiceLocation;
  }

  /**
   * Parameters for accountsServiceLocationsPartialUpdate
   */
  export interface AccountsServiceLocationsPartialUpdateParams {

    /**
     * A unique integer value identifying this service location.
     */
    id: number;
    data: ServiceLocation;
  }

  /**
   * Parameters for accountsServicePhotosList
   */
  export interface AccountsServicePhotosListParams {
    service?: number;

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
   * Parameters for accountsServicePhotosUpdate
   */
  export interface AccountsServicePhotosUpdateParams {

    /**
     * A unique integer value identifying this service photo.
     */
    id: number;
    data: ServicePhoto;
  }

  /**
   * Parameters for accountsServicePhotosPartialUpdate
   */
  export interface AccountsServicePhotosPartialUpdateParams {

    /**
     * A unique integer value identifying this service photo.
     */
    id: number;
    data: ServicePhoto;
  }

  /**
   * Parameters for accountsServicePricesList
   */
  export interface AccountsServicePricesListParams {
    service?: number;

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
    isPriceFixed?: string;
  }

  /**
   * Parameters for accountsServicePricesUpdate
   */
  export interface AccountsServicePricesUpdateParams {

    /**
     * A unique integer value identifying this price.
     */
    id: number;
    data: Price;
  }

  /**
   * Parameters for accountsServicePricesPartialUpdate
   */
  export interface AccountsServicePricesPartialUpdateParams {

    /**
     * A unique integer value identifying this price.
     */
    id: number;
    data: Price;
  }

  /**
   * Parameters for accountsServiceSchedulePeriodsList
   */
  export interface AccountsServiceSchedulePeriodsListParams {
    startDate?: string;
    service?: number;

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
    endDate?: string;
  }

  /**
   * Parameters for accountsServiceSchedulePeriodsUpdate
   */
  export interface AccountsServiceSchedulePeriodsUpdateParams {

    /**
     * A unique integer value identifying this service schedule period.
     */
    id: number;
    data: ServiceSchedulePeriod;
  }

  /**
   * Parameters for accountsServiceSchedulePeriodsPartialUpdate
   */
  export interface AccountsServiceSchedulePeriodsPartialUpdateParams {

    /**
     * A unique integer value identifying this service schedule period.
     */
    id: number;
    data: ServiceSchedulePeriod;
  }

  /**
   * Parameters for accountsServiceScheduleList
   */
  export interface AccountsServiceScheduleListParams {
    service?: number;

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
    dayOfWeek?: string;
  }

  /**
   * Parameters for accountsServiceScheduleUpdate
   */
  export interface AccountsServiceScheduleUpdateParams {

    /**
     * A unique integer value identifying this service schedule.
     */
    id: number;
    data: ServiceSchedule;
  }

  /**
   * Parameters for accountsServiceSchedulePartialUpdate
   */
  export interface AccountsServiceSchedulePartialUpdateParams {

    /**
     * A unique integer value identifying this service schedule.
     */
    id: number;
    data: ServiceSchedule;
  }

  /**
   * Parameters for accountsServiceTagsList
   */
  export interface AccountsServiceTagsListParams {
    service?: number;

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
   * Parameters for accountsServiceTagsUpdate
   */
  export interface AccountsServiceTagsUpdateParams {

    /**
     * A unique integer value identifying this service tag.
     */
    id: number;
    data: ServiceTag;
  }

  /**
   * Parameters for accountsServiceTagsPartialUpdate
   */
  export interface AccountsServiceTagsPartialUpdateParams {

    /**
     * A unique integer value identifying this service tag.
     */
    id: number;
    data: ServiceTag;
  }

  /**
   * Parameters for accountsServicesList
   */
  export interface AccountsServicesListParams {

    /**
     * A search term.
     */
    search?: string;
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
    isEnabled?: string;
    isBaseSchedule?: string;
  }

  /**
   * Parameters for accountsServicesUpdate
   */
  export interface AccountsServicesUpdateParams {

    /**
     * A unique integer value identifying this service.
     */
    id: number;
    data: Service;
  }

  /**
   * Parameters for accountsServicesPartialUpdate
   */
  export interface AccountsServicesPartialUpdateParams {

    /**
     * A unique integer value identifying this service.
     */
    id: number;
    data: Service;
  }

  /**
   * Parameters for accountsSettingsList
   */
  export interface AccountsSettingsListParams {

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
   * Parameters for accountsSettingsUpdate
   */
  export interface AccountsSettingsUpdateParams {

    /**
     * A unique integer value identifying this user settings.
     */
    id: number;
    data: UserSettings;
  }

  /**
   * Parameters for accountsSettingsPartialUpdate
   */
  export interface AccountsSettingsPartialUpdateParams {

    /**
     * A unique integer value identifying this user settings.
     */
    id: number;
    data: UserSettings;
  }
}

export { AccountsService }
