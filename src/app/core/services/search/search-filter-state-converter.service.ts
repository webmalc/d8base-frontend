import { Injectable } from '@angular/core';
import { Category, City, Country, Language, Rate, ServiceList, Subcategory } from '@app/api/models';
import { ProfessionalsService, SearchService } from '@app/api/services';
import { arrayToString, emptyArrayToUndefined } from '@app/core/functions/array.functions';
import { fromDatetime } from '@app/core/functions/datetime.functions';
import { hasWord, toArray } from '@app/core/functions/string.functions';
import { CitiesApiCache, CountriesApiCache, LanguagesApiCache, RatesApiCache } from '@app/core/services/cache';
import { SearchFilterFormValue } from '@app/search/interfaces/search-filter-form-value.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

function getServiceTypes(data: SearchFilterFormValue): string {
  const types: ServiceList['service_type'][] = [];
  if (data.isOnlineService) {
    types.push('online');
  }
  if (data.isAtMasterLocationService) {
    types.push('professional');
  }
  if (data.isAtClientLocationService) {
    types.push('client');
  }

  return arrayToString(types);
}

function getTimeStamp(dateStr: string, timeStr: string, defaultTime: string): string {
  if (!dateStr) {
    return '';
  }

  return timeStr ? `${dateStr}T${timeStr}` : `${dateStr}T${defaultTime}`;
}

const DAY_START_TIME = '00:00';
const DAY_END_TIME = '23:59';

@Injectable()
export class SearchFilterStateConverter {
  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly citiesApiCache: CitiesApiCache,
    private readonly ratesApiCache: RatesApiCache,
    private readonly professionalsApi: ProfessionalsService,
  ) {}

  public getSearchFilterState(params: SearchService.SearchListParams): Observable<SearchFilterFormValue> {
    if (!params) {
      return of();
    }

    return forkJoin(this.getExpandedParams(params)).pipe(
      map(
        ([countries, city, categories, subcategories, languages, rates]: [
          Country[],
          City,
          Category[],
          Subcategory[],
          Language[],
          Rate[],
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
                  currency: rates.find(c => c.currency === params?.priceCurrency),
                  ...(params?.startPrice ? { start: params?.startPrice } : null),
                  ...(params?.endPrice ? { end: params?.endPrice } : null),
                }
              : null;

          const startDatetime = fromDatetime(params?.startDatetime);
          const endDatetime = fromDatetime(params?.endDatetime);
          const searchFilterState: SearchFilterFormValue = {
            query: params?.query,
            country,
            city,
            category: categories[0],
            subcategory: subcategories[0],
            tags: void 0,
            isOnlineBooking: void 0,
            isInstantBooking: params?.onlyWithAutoOrderConfirmation,
            dateFrom: startDatetime.date,
            dateTo: endDatetime.date,
            timeFrom: startDatetime.time,
            timeTo: endDatetime.time,
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
            experience: params?.experienceFrom,
            startAge: params?.startAge,
            endAge: params?.endAge,
            exactDatetime: params?.exactDatetime,
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
      // null and undefined values are meant to be excluded
      tags: void 0,
      subregion: void 0,
      subcategories: data.subcategory?.id ? `${data.subcategory?.id}` : null,
      startPrice: data.priceStart,
      startDatetime: getTimeStamp(data.dateFrom, data.timeFrom, DAY_START_TIME) || null,
      startAge: data.startAge,
      serviceTypes: getServiceTypes(data) || null,
      region: void 0,
      ratingFrom: data.rating,
      query: data.query || null,
      professionalLevel: data.professionalLevel?.value,
      priceCurrency: data.priceStart || data.priceEnd ? data.priceCurrency?.currency : void 0,
      postalCode: void 0,
      paymentMethods: arrayToString(data?.paymentMethods?.map(({ value }) => value)) || null,
      onlyWithReviews: data?.onlyWithReviews || null,
      onlyWithPhotos: data?.onlyWithPhotos || null,
      onlyWithFixedPrice: data?.onlyWithFixedPrice || null,
      onlyWithCertificates: data?.onlyWithCertificates || null,
      onlyWithAutoOrderConfirmation: data.isInstantBooking || null,
      nationalities: arrayToString(data?.nationalities?.map(({ id }) => id)) || null,
      maxDistance: void 0,
      longitude: null,
      latitude: null,
      languages: arrayToString(data.languages?.map(({ code }) => code)) || null,
      gender: void 0,
      experienceFrom: data.experience,
      endPrice: data.priceEnd,
      endDatetime: getTimeStamp(data.dateTo, data.timeTo, DAY_END_TIME) || null,
      endAge: data.endAge,
      district: void 0,
      country: data.country?.id,
      city: data.city?.id,
      categories: data.category?.id ? `${data.category?.id}` : null,
      exactDatetime: data.exactDatetime || null,
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
    Observable<Rate[]>,
  ] {
    return [
      params?.country || params?.nationalities ? this.countriesApiCache.list() : of([]),
      params?.city ? this.citiesApiCache.getByEntityId(params.city) : of(void 0),
      params?.categories ? this.getCategories(toArray(params.categories).map(idStr => parseInt(idStr, 10))) : of([]),
      params?.subcategories
        ? this.getSubcategories(toArray(params.subcategories).map(idStr => parseInt(idStr, 10)))
        : of([]),
      params?.languages
        ? this.languagesApiCache.list().pipe(map(languages => languages.filter(l => params.languages.includes(l.code))))
        : of([]),
      params?.priceCurrency ? this.ratesApiCache.list() : of([]),
    ];
  }

  private getCategories(ids: number[]): Observable<Category[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsCategoriesRead(id)));
  }

  private getSubcategories(ids: number[]): Observable<Subcategory[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsSubcategoriesRead(id)));
  }
}
