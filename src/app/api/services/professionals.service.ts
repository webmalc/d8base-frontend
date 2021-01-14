/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Category } from '../models/category';
import { ProfessionalPhotoList } from '../models/professional-photo-list';
import { ProfessionalList } from '../models/professional-list';
import { Subcategory } from '../models/subcategory';
import { ProfessionalTagList } from '../models/professional-tag-list';
@Injectable({
  providedIn: 'root',
})
class ProfessionalsService extends __BaseService {
  static readonly professionalsCategoriesListPath = '/professionals/categories/';
  static readonly professionalsCategoriesReadPath = '/professionals/categories/{id}/';
  static readonly professionalsProfessionalPhotosListPath = '/professionals/professional-photos/';
  static readonly professionalsProfessionalPhotosReadPath = '/professionals/professional-photos/{id}/';
  static readonly professionalsProfessionalsListPath = '/professionals/professionals/';
  static readonly professionalsProfessionalsReadPath = '/professionals/professionals/{id}/';
  static readonly professionalsSubcategoriesListPath = '/professionals/subcategories/';
  static readonly professionalsSubcategoriesReadPath = '/professionals/subcategories/{id}/';
  static readonly professionalsTagsListPath = '/professionals/tags/';
  static readonly professionalsTagsReadPath = '/professionals/tags/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * The category viewset.
   * @param params The `ProfessionalsService.ProfessionalsCategoriesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  professionalsCategoriesListResponse(params: ProfessionalsService.ProfessionalsCategoriesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Category>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/categories/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Category>}>;
      })
    );
  }
  /**
   * The category viewset.
   * @param params The `ProfessionalsService.ProfessionalsCategoriesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  professionalsCategoriesList(params: ProfessionalsService.ProfessionalsCategoriesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Category>}> {
    return this.professionalsCategoriesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Category>})
    );
  }

  /**
   * The category viewset.
   * @param id A unique integer value identifying this category.
   */
  professionalsCategoriesReadResponse(id: number): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/categories/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * The category viewset.
   * @param id A unique integer value identifying this category.
   */
  professionalsCategoriesRead(id: number): __Observable<Category> {
    return this.professionalsCategoriesReadResponse(id).pipe(
      __map(_r => _r.body as Category)
    );
  }

  /**
   * The professional photo list viewset.
   * @param params The `ProfessionalsService.ProfessionalsProfessionalPhotosListParams` containing the following parameters:
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
  professionalsProfessionalPhotosListResponse(params: ProfessionalsService.ProfessionalsProfessionalPhotosListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhotoList>}>> {
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
      this.rootUrl + `/professionals/professional-photos/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhotoList>}>;
      })
    );
  }
  /**
   * The professional photo list viewset.
   * @param params The `ProfessionalsService.ProfessionalsProfessionalPhotosListParams` containing the following parameters:
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
  professionalsProfessionalPhotosList(params: ProfessionalsService.ProfessionalsProfessionalPhotosListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhotoList>}> {
    return this.professionalsProfessionalPhotosListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalPhotoList>})
    );
  }

  /**
   * The professional photo list viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  professionalsProfessionalPhotosReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalPhotoList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/professional-photos/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalPhotoList>;
      })
    );
  }
  /**
   * The professional photo list viewset.
   * @param id A unique integer value identifying this professional photo.
   */
  professionalsProfessionalPhotosRead(id: number): __Observable<ProfessionalPhotoList> {
    return this.professionalsProfessionalPhotosReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalPhotoList)
    );
  }

  /**
   * The professional list viewset.
   * @param params The `ProfessionalsService.ProfessionalsProfessionalsListParams` containing the following parameters:
   *
   * - `subcategory__category`:
   *
   * - `subcategory`:
   *
   * - `search`: A search term.
   *
   * - `pk_in`: Multiple values may be separated by commas.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `level`:
   *
   * - `experience`:
   */
  professionalsProfessionalsListResponse(params: ProfessionalsService.ProfessionalsProfessionalsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.subcategoryCategory != null) __params = __params.set('subcategory__category', params.subcategoryCategory.toString());
    if (params.subcategory != null) __params = __params.set('subcategory', params.subcategory.toString());
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pkIn != null) __params = __params.set('pk_in', params.pkIn.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.level != null) __params = __params.set('level', params.level.toString());
    if (params.experience != null) __params = __params.set('experience', params.experience.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/professionals/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalList>}>;
      })
    );
  }
  /**
   * The professional list viewset.
   * @param params The `ProfessionalsService.ProfessionalsProfessionalsListParams` containing the following parameters:
   *
   * - `subcategory__category`:
   *
   * - `subcategory`:
   *
   * - `search`: A search term.
   *
   * - `pk_in`: Multiple values may be separated by commas.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `level`:
   *
   * - `experience`:
   */
  professionalsProfessionalsList(params: ProfessionalsService.ProfessionalsProfessionalsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalList>}> {
    return this.professionalsProfessionalsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalList>})
    );
  }

  /**
   * The professional list viewset.
   * @param id A unique integer value identifying this professional.
   */
  professionalsProfessionalsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/professionals/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalList>;
      })
    );
  }
  /**
   * The professional list viewset.
   * @param id A unique integer value identifying this professional.
   */
  professionalsProfessionalsRead(id: number): __Observable<ProfessionalList> {
    return this.professionalsProfessionalsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalList)
    );
  }

  /**
   * The subcategory viewset.
   * @param params The `ProfessionalsService.ProfessionalsSubcategoriesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `category`:
   */
  professionalsSubcategoriesListResponse(params: ProfessionalsService.ProfessionalsSubcategoriesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Subcategory>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/subcategories/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Subcategory>}>;
      })
    );
  }
  /**
   * The subcategory viewset.
   * @param params The `ProfessionalsService.ProfessionalsSubcategoriesListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `category`:
   */
  professionalsSubcategoriesList(params: ProfessionalsService.ProfessionalsSubcategoriesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Subcategory>}> {
    return this.professionalsSubcategoriesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Subcategory>})
    );
  }

  /**
   * The subcategory viewset.
   * @param id A unique integer value identifying this subcategory.
   */
  professionalsSubcategoriesReadResponse(id: number): __Observable<__StrictHttpResponse<Subcategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/subcategories/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Subcategory>;
      })
    );
  }
  /**
   * The subcategory viewset.
   * @param id A unique integer value identifying this subcategory.
   */
  professionalsSubcategoriesRead(id: number): __Observable<Subcategory> {
    return this.professionalsSubcategoriesReadResponse(id).pipe(
      __map(_r => _r.body as Subcategory)
    );
  }

  /**
   * The professional tag list viewset.
   * @param params The `ProfessionalsService.ProfessionalsTagsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  professionalsTagsListResponse(params: ProfessionalsService.ProfessionalsTagsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTagList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('page_size', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/tags/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTagList>}>;
      })
    );
  }
  /**
   * The professional tag list viewset.
   * @param params The `ProfessionalsService.ProfessionalsTagsListParams` containing the following parameters:
   *
   * - `search`: A search term.
   *
   * - `page_size`: Number of results to return per page.
   *
   * - `page`: A page number within the paginated result set.
   *
   * - `ordering`: Which field to use when ordering the results.
   */
  professionalsTagsList(params: ProfessionalsService.ProfessionalsTagsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTagList>}> {
    return this.professionalsTagsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ProfessionalTagList>})
    );
  }

  /**
   * The professional tag list viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  professionalsTagsReadResponse(id: number): __Observable<__StrictHttpResponse<ProfessionalTagList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/professionals/tags/${encodeURIComponent(id)}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProfessionalTagList>;
      })
    );
  }
  /**
   * The professional tag list viewset.
   * @param id A unique integer value identifying this professional tag.
   */
  professionalsTagsRead(id: number): __Observable<ProfessionalTagList> {
    return this.professionalsTagsReadResponse(id).pipe(
      __map(_r => _r.body as ProfessionalTagList)
    );
  }
}

module ProfessionalsService {

  /**
   * Parameters for professionalsCategoriesList
   */
  export interface ProfessionalsCategoriesListParams {

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
   * Parameters for professionalsProfessionalPhotosList
   */
  export interface ProfessionalsProfessionalPhotosListParams {

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
  }

  /**
   * Parameters for professionalsProfessionalsList
   */
  export interface ProfessionalsProfessionalsListParams {
    subcategoryCategory?: string;
    subcategory?: string;

    /**
     * A search term.
     */
    search?: string;

    /**
     * Multiple values may be separated by commas.
     */
    pkIn?: number;

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
    level?: string;
    experience?: string;
  }

  /**
   * Parameters for professionalsSubcategoriesList
   */
  export interface ProfessionalsSubcategoriesListParams {

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
    category?: string;
  }

  /**
   * Parameters for professionalsTagsList
   */
  export interface ProfessionalsTagsListParams {

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

export { ProfessionalsService }
