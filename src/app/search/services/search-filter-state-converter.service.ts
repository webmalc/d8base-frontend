import { Injectable } from '@angular/core';
import { Category, City, Country, Language, Subcategory } from '@app/api/models';
import { ProfessionalsService, SearchService } from '@app/api/services';
import { CitiesApiCache, CountriesApiCache, LanguagesApiCache } from '@app/core/services/cache';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const serviceTypesParams = (data: SearchFilterStateInterface): string => {
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

const hasWord = (data: string, word: string): boolean => data?.split(',').includes(word);

const stringOrNull = (value: number): string | null => (value ? `${value}` : null);

const emptyArrayToUndefined = <T>(arr: T[]): T[] | undefined => (arr?.length ? arr : void 0);

@Injectable()
export class SearchFilterStateConverter {
  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly citiesApiCache: CitiesApiCache,
    private readonly professionalsApi: ProfessionalsService,
  ) {}

  public getSearchFilterState(params: SearchService.SearchListParams): Observable<SearchFilterStateInterface> {
    if (!params) {
      return of();
    }

    return combineLatest(Object.values(this.getExpandedParams(params))).pipe(
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
          const searchFilterState: SearchFilterStateInterface = {
            query: params?.query,
            location: {
              country,
              city,
              coordinates: {
                latitude: parseFloat(params?.latitude),
                longitude: parseFloat(params?.longitude),
              },
            },
            radius: {
              distance: params?.maxDistance,
              units: void 0,
            },
            category: emptyArrayToUndefined(categories),
            subcategory: emptyArrayToUndefined(subcategories),
            tags: void 0,
            isOnlineBooking: void 0,
            isInstantBooking: params?.onlyWithAutoOrderConfirmation,
            datetime: {
              from: params?.startDatetime,
              to: params?.endDatetime,
            },
            isOnlineService: hasWord(params?.serviceTypes, 'online'),
            isAtMasterLocationService: hasWord(params?.serviceTypes, 'professional'),
            isAtClientLocationService: hasWord(params?.serviceTypes, 'client'),
            price: {
              currency: { currency: params?.priceCurrency, value: void 0 },
              start: params?.startPrice,
              end: params?.endPrice,
            },
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

  public getSearchListParams(data: SearchFilterStateInterface): SearchService.SearchListParams {
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
      subcategories: data?.subcategory?.map(({ id }) => id).join(','),

      /**
       * start price value (12.35)
       */
      startPrice: data?.price.start,

      /**
       * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
       */
      startDatetime: data?.datetime.from,

      /**
       * professional start age
       */
      startAge: data?.startAge,

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
      ratingFrom: data?.rating,

      /**
       * search term query param
       */
      query: data?.query,

      /**
       * professional level
       */
      professionalLevel: data?.professionalLevel?.value,

      /**
       * price currency (usd)
       */
      priceCurrency: data?.price?.currency?.currency,

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
      maxDistance: data?.radius?.distance,

      /**
       * longitude (-79.3849)
       */
      longitude: stringOrNull(data?.location?.coordinates?.longitude),

      /**
       * latitude (43.6529)
       */
      latitude: stringOrNull(data?.location?.coordinates?.latitude),

      /**
       * multiple values may be separated by commas
       */
      languages: data?.languages?.map(({ code }) => code).join(', '),

      /**
       * male: 0,                 female: 1
       */
      gender: void 0,

      /**
       * professional experience
       */
      experience: data?.experience,

      /**
       * end price value (16.50)
       */
      endPrice: data?.price.end,

      /**
       * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
       */
      endDatetime: data?.datetime.to,

      /**
       * professional end age
       */
      endAge: data?.endAge,

      /**
       * district ID
       */
      district: void 0,

      /**
       * country ID
       */
      country: data?.location?.country?.id,

      /**
       * city ID
       */
      city: data?.location?.city?.id,

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
