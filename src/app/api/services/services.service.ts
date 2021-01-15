/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ServicePhotoList } from '../models/service-photo-list';
import { ServiceList } from '../models/service-list';
import { ServiceTagList } from '../models/service-tag-list';
@Injectable({
    providedIn: 'root'
})
class ServicesService extends __BaseService {
    static readonly servicesServicePhotosListPath = '/services/service-photos/';
    static readonly servicesServicePhotosReadPath = '/services/service-photos/{id}/';
    static readonly servicesServicesListPath = '/services/services/';
    static readonly servicesServicesReadPath = '/services/services/{id}/';
    static readonly servicesTagsListPath = '/services/tags/';
    static readonly servicesTagsReadPath = '/services/tags/{id}/';

    constructor(config: __Configuration, http: HttpClient) {
        super(config, http);
    }

    /**
     * The service photo list viewset.
     * @param params The `ServicesService.ServicesServicePhotosListParams` containing the following parameters:
     *
     * - `service__professional`:
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
    servicesServicePhotosListResponse(
        params: ServicesService.ServicesServicePhotosListParams
    ): __Observable<
        __StrictHttpResponse<{ count: number; next?: null | string; previous?: null | string; results: Array<ServicePhotoList> }>
    > {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        if (params.serviceProfessional != null) __params = __params.set('service__professional', params.serviceProfessional.toString());
        if (params.service != null) __params = __params.set('service', params.service.toString());
        if (params.search != null) __params = __params.set('search', params.search.toString());
        if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
        if (params.page != null) __params = __params.set('page', params.page.toString());
        if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/service-photos/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<{
                    count: number;
                    next?: null | string;
                    previous?: null | string;
                    results: Array<ServicePhotoList>;
                }>;
            })
        );
    }
    /**
     * The service photo list viewset.
     * @param params The `ServicesService.ServicesServicePhotosListParams` containing the following parameters:
     *
     * - `service__professional`:
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
    servicesServicePhotosList(
        params: ServicesService.ServicesServicePhotosListParams
    ): __Observable<{ count: number; next?: null | string; previous?: null | string; results: Array<ServicePhotoList> }> {
        return this.servicesServicePhotosListResponse(params).pipe(
            __map(_r => _r.body as { count: number; next?: null | string; previous?: null | string; results: Array<ServicePhotoList> })
        );
    }

    /**
     * The service photo list viewset.
     * @param id A unique integer value identifying this service photo.
     */
    servicesServicePhotosReadResponse(id: number): __Observable<__StrictHttpResponse<ServicePhotoList>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/service-photos/${encodeURIComponent(id)}/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<ServicePhotoList>;
            })
        );
    }
    /**
     * The service photo list viewset.
     * @param id A unique integer value identifying this service photo.
     */
    servicesServicePhotosRead(id: number): __Observable<ServicePhotoList> {
        return this.servicesServicePhotosReadResponse(id).pipe(__map(_r => _r.body as ServicePhotoList));
    }

    /**
     * The service viewset.
     * @param params The `ServicesService.ServicesServicesListParams` containing the following parameters:
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
    servicesServicesListResponse(
        params: ServicesService.ServicesServicesListParams
    ): __Observable<__StrictHttpResponse<{ count: number; next?: null | string; previous?: null | string; results: Array<ServiceList> }>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        if (params.search != null) __params = __params.set('search', params.search.toString());
        if (params.professional != null) __params = __params.set('professional', params.professional.toString());
        if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
        if (params.page != null) __params = __params.set('page', params.page.toString());
        if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
        if (params.isEnabled != null) __params = __params.set('is_enabled', params.isEnabled.toString());
        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/services/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<{
                    count: number;
                    next?: null | string;
                    previous?: null | string;
                    results: Array<ServiceList>;
                }>;
            })
        );
    }
    /**
     * The service viewset.
     * @param params The `ServicesService.ServicesServicesListParams` containing the following parameters:
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
    servicesServicesList(
        params: ServicesService.ServicesServicesListParams
    ): __Observable<{ count: number; next?: null | string; previous?: null | string; results: Array<ServiceList> }> {
        return this.servicesServicesListResponse(params).pipe(
            __map(_r => _r.body as { count: number; next?: null | string; previous?: null | string; results: Array<ServiceList> })
        );
    }

    /**
     * The service viewset.
     * @param id A unique integer value identifying this service.
     */
    servicesServicesReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceList>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/services/${encodeURIComponent(id)}/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<ServiceList>;
            })
        );
    }
    /**
     * The service viewset.
     * @param id A unique integer value identifying this service.
     */
    servicesServicesRead(id: number): __Observable<ServiceList> {
        return this.servicesServicesReadResponse(id).pipe(__map(_r => _r.body as ServiceList));
    }

    /**
     * The service tag list viewset.
     * @param params The `ServicesService.ServicesTagsListParams` containing the following parameters:
     *
     * - `search`: A search term.
     *
     * - `page_size`: Number of results to return per page.
     *
     * - `page`: A page number within the paginated result set.
     *
     * - `ordering`: Which field to use when ordering the results.
     */
    servicesTagsListResponse(
        params: ServicesService.ServicesTagsListParams
    ): __Observable<
        __StrictHttpResponse<{ count: number; next?: null | string; previous?: null | string; results: Array<ServiceTagList> }>
    > {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        if (params.search != null) __params = __params.set('search', params.search.toString());
        if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
        if (params.page != null) __params = __params.set('page', params.page.toString());
        if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/tags/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<{
                    count: number;
                    next?: null | string;
                    previous?: null | string;
                    results: Array<ServiceTagList>;
                }>;
            })
        );
    }
    /**
     * The service tag list viewset.
     * @param params The `ServicesService.ServicesTagsListParams` containing the following parameters:
     *
     * - `search`: A search term.
     *
     * - `page_size`: Number of results to return per page.
     *
     * - `page`: A page number within the paginated result set.
     *
     * - `ordering`: Which field to use when ordering the results.
     */
    servicesTagsList(
        params: ServicesService.ServicesTagsListParams
    ): __Observable<{ count: number; next?: null | string; previous?: null | string; results: Array<ServiceTagList> }> {
        return this.servicesTagsListResponse(params).pipe(
            __map(_r => _r.body as { count: number; next?: null | string; previous?: null | string; results: Array<ServiceTagList> })
        );
    }

    /**
     * The service tag list viewset.
     * @param id A unique integer value identifying this service tag.
     */
    servicesTagsReadResponse(id: number): __Observable<__StrictHttpResponse<ServiceTagList>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>('GET', this.rootUrl + `/services/tags/${encodeURIComponent(id)}/`, __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map(_r => {
                return _r as __StrictHttpResponse<ServiceTagList>;
            })
        );
    }
    /**
     * The service tag list viewset.
     * @param id A unique integer value identifying this service tag.
     */
    servicesTagsRead(id: number): __Observable<ServiceTagList> {
        return this.servicesTagsReadResponse(id).pipe(__map(_r => _r.body as ServiceTagList));
    }
}

module ServicesService {
    /**
     * Parameters for servicesServicePhotosList
     */
    export interface ServicesServicePhotosListParams {
        serviceProfessional?: string;
        service?: string;

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
     * Parameters for servicesServicesList
     */
    export interface ServicesServicesListParams {
        /**
         * A search term.
         */
        search?: string;
        professional?: string;

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
     * Parameters for servicesTagsList
     */
    export interface ServicesTagsListParams {
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
}

export { ServicesService };
