import { Injectable } from '@angular/core';
import { Category, City, Country, Language, Subcategory } from '@app/api/models';
import { ProfessionalsService, SearchService } from '@app/api/services';
import { emptyArrayToUndefined } from '@app/core/functions/array.functions';
import { hasWord } from '@app/core/functions/string.functions';
import { CitiesApiCache, CountriesApiCache, LanguagesApiCache } from '@app/core/services/cache';
import { SearchFilterFormValue } from '@app/search/interfaces/search-filter-form-value.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const serviceTypesParams = (data: SearchFilterFormValue): string => {
  const types = [];
  if (data.isOnlineService) {
    types.push('online');
  }
  if (data.isAtMasterLocationService) {
    types.push('professional');
  }
  if (data.isAtClientLocationService) {
    types.push('client');
  }

  return types.join(',') || null;
};

@Injectable({ providedIn: 'root' })
export class SearchFilterStateConverter {
  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly citiesApiCache: CitiesApiCache,
    private readonly professionalsApi: ProfessionalsService,
  ) {}

  public getSearchFilterState(params: SearchService.SearchListParams): Observable<SearchFilterFormValue> {
    if (!params) {
      return of();
    }

    return forkJoin(this.getExpandedParams(params)).pipe(
      map(
        ([countries, city, categories, subcategories, languages]: [
          Country[],
          City,
          Category[],
          Subcategory[],
          Language[],
        ]) => {
          const country = params?.country ? countries.find(({ id }) => Number(id) === Number(params.country)) : void 0;
          const nationalities = params?.nationalities
            ? countries.filter(({ id }) =>
                params.nationalities
                  .split(',')
                  .map(nationality => parseInt(nationality, 10))
                  .includes(id),
              )
            : void 0;
          const price =
            params?.priceCurrency && (params?.startPrice || params?.endPrice)
              ? {
                  currency: { currency: params?.priceCurrency, value: void 0 },
                  ...(params?.startPrice ? { start: params?.startPrice } : null),
                  ...(params?.endPrice ? { end: params?.endPrice } : null),
                }
              : null;

          const searchFilterState: SearchFilterFormValue = {
            query: params?.query,
            country,
            city,
            category: emptyArrayToUndefined(categories),
            subcategory: emptyArrayToUndefined(subcategories),
            tags: void 0,
            isOnlineBooking: void 0,
            isInstantBooking: params?.onlyWithAutoOrderConfirmation,
            dateFrom: params?.startDatetime,
            dateTo: params?.endDatetime,
            isOnlineService: hasWord(params?.serviceTypes, 'online'),
            isAtMasterLocationService: hasWord(params?.serviceTypes, 'professional'),
            isAtClientLocationService: hasWord(params?.serviceTypes, 'client'),
            priceStart: price?.start,
            priceEnd: price?.end,
            priceCurrency: price?.currency,
            rating: params?.ratingFrom ? Number(params?.ratingFrom) : void 0,
            professionalLevel: params?.professionalLevel ? { value: params?.professionalLevel } : void 0,
            paymentMethods: params?.paymentMethods
              ?.split(',')
              .map((paymentMethod: 'cash' | 'online') => ({ value: paymentMethod })),
            onlyWithReviews: params?.onlyWithReviews,
            onlyWithPhotos: params?.onlyWithPhotos,
            onlyWithFixedPrice: params?.onlyWithFixedPrice,
            onlyWithCertificates: params?.onlyWithCertificates,
            nationalities: emptyArrayToUndefined(nationalities),
            languages: emptyArrayToUndefined(languages),
            experience: params?.experience,
            startAge: params?.startAge,
            endAge: params?.endAge,
          };
          return searchFilterState;
        },
      ),
    );
  }

  public getSearchListParams(data: SearchFilterFormValue): SearchService.SearchListParams {
    if (!data) {
      return;
    }

    return {
      /**
       * multiple values may be separated by commas
       */
      tags: void 0,

      /**
       * subregion ID
       */
      subregion: void 0,

      /**
       * multiple subcategory IDs may be separated by commas
       */
      subcategories: data.subcategory?.map(({ id }) => id).join(','),

      /**
       * start price value (12.35)
       */
      startPrice: data.priceStart,

      /**
       * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
       */
      startDatetime: data.dateFrom,

      /**
       * professional start age
       */
      startAge: data.startAge,

      /**
       * multiple types may be separated by commas
       */
      serviceTypes: serviceTypesParams(data),

      /**
       * region ID
       */
      region: void 0,

      /**
       * professional rating
       */
      ratingFrom: data.rating,

      /**
       * search term query param
       */
      query: data.query || null,

      /**
       * professional level
       */
      professionalLevel: data.professionalLevel?.value,

      /**
       * price currency (usd)
       */
      priceCurrency: data.priceCurrency?.currency,

      /**
       * postal code ID
       */
      postalCode: void 0,

      /**
       * multiple methods may be separated by commas
       */
      paymentMethods: data?.paymentMethods?.map(({ value }) => value).join(', '),
      onlyWithReviews: data?.onlyWithReviews || null,
      onlyWithPhotos: data?.onlyWithPhotos || null,
      onlyWithFixedPrice: data?.onlyWithFixedPrice || null,
      onlyWithCertificates: data?.onlyWithCertificates || null,
      onlyWithAutoOrderConfirmation: data.isInstantBooking || null,

      /**
       * multiple country IDs may be separated by commas
       */
      nationalities: data?.nationalities?.map(({ id }) => id).join(', '),

      /**
       * max distance
       */
      maxDistance: void 0,

      /**
       * longitude (-79.3849)
       */
      longitude: '',

      /**
       * latitude (43.6529)
       */
      latitude: '',

      /**
       * multiple values may be separated by commas
       */
      languages: data.languages?.map(({ code }) => code).join(', '),

      /**
       * male: 0, female: 1
       */
      gender: void 0,

      /**
       * professional experience
       */
      experience: data?.experience,

      /**
       * end price value (16.50)
       */
      endPrice: data.priceEnd,

      /**
       * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
       */
      endDatetime: data.dateTo,

      /**
       * professional end age
       */
      endAge: data.endAge,

      /**
       * district ID
       */
      district: void 0,

      /**
       * country ID
       */
      country: data.country?.id,

      /**
       * city ID
       */
      city: data.city?.id,

      /**
       * multiple category IDs may be separated by commas
       */
      categories: data?.category?.map(({ id }) => id).join(','),
    };
  }

  private getExpandedParams(
    params: SearchService.SearchListParams,
  ): [
    Observable<Country[]>,
    Observable<City>,
    Observable<Category[]>,
    Observable<Subcategory[]>,
    Observable<Language[]>,
  ] {
    return [
      params?.country || params?.nationalities ? this.countriesApiCache.list() : of([]),
      params?.city ? this.citiesApiCache.getByEntityId(params.city) : of(void 0),
      params?.categories ? this.getCategories(params.categories.split(',').map(idStr => parseInt(idStr, 10))) : of([]),
      params?.subcategories
        ? this.getSubcategories(params.subcategories.split(',').map(idStr => parseInt(idStr, 10)))
        : of([]),
      params?.languages ? this.languagesApiCache.list() : of([]),
    ];
  }

  private getCategories(ids: number[]): Observable<Category[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsCategoriesRead(id)));
  }

  private getSubcategories(ids: number[]): Observable<Subcategory[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsSubcategoriesRead(id)));
  }
}
