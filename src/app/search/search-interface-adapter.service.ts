import { Injectable } from '@angular/core';
import { Category, City, Country, Language, Subcategory } from '@app/api/models';
import { ProfessionalsService, SearchService } from '@app/api/services';
import { CitiesApiCache, CountriesApiCache, LanguagesApiCache } from '@app/core/services/cache';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StateInterfaceAdapter {
  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly citiApiCache: CitiesApiCache,
    private readonly professionalsApi: ProfessionalsService,
  ) {}

  public getSearchFilterStateInterfaceFromSearchListParams(
    params: SearchService.SearchListParams,
  ): Observable<SearchFilterStateInterface> {
    if (!params) {
      return;
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
          const country = this.isCountryNeed(params) ? countries.find(({ id }) => id === params.country) : void 0;
          const nationalities = this.isNationalitiesNeed(params)
            ? countries.filter(({ id }) =>
                params.nationalities
                  .split(',')
                  .map(nationality => parseInt(nationality, 10))
                  .includes(id),
              )
            : void 0;
          const searchFilterState: SearchFilterStateInterface = {
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
            category: categories,
            subcategory: subcategories,
            tags: void 0,
            isOnlineBooking: void 0,
            isInstantBooking: params?.onlyWithAutoOrderConfirmation,
            datetime: {
              from: params?.startDatetime,
              to: params?.endDatetime,
            },
            isOnlineService: params?.serviceTypes === 'online',
            isAtMasterLocationService: params?.serviceTypes === 'professional',
            isAtClientLocationService: params?.serviceTypes === 'client',
            price: {
              currency: { currency: params?.priceCurrency, value: void 0 },
              start: params?.startPrice,
              end: params?.endPrice,
            },
            rating: params?.ratingFrom,
            professionalLevel: { value: params?.professionalLevel },
            paymentMethods: params?.paymentMethods
              .split(',')
              .map((paymentMethod: 'cash' | 'online') => ({ value: paymentMethod })),
            onlyWithReviews: params?.onlyWithReviews,
            onlyWithPhotos: params?.onlyWithPhotos,
            onlyWithFixedPrice: params?.onlyWithFixedPrice,
            onlyWithCertificates: params?.onlyWithCertificates,
            nationalities,
            languages,
            experience: params?.experience,
            startAge: params?.startAge,
            endAge: params?.endAge,
          };
          return searchFilterState;
        },
      ),
    );
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
      this.isCountryNeed(params) || this.isNationalitiesNeed(params) ? this.countriesApiCache.list() : of([]),
      this.isCityNeed(params) ? this.citiApiCache.getByEntityId(params.city) : of(void 0),
      this.isCategoriesNeed(params)
        ? this.getCategories(params.categories.split(',').map(idStr => parseInt(idStr, 10)))
        : of([]),
      this.isSubcategoriesNeed(params)
        ? this.getSubcategories(params.subcategories.split(',').map(idStr => parseInt(idStr, 10)))
        : of([]),
      this.isLanguagesNeed(params) ? this.languagesApiCache.list() : of([]),
    ];
  }

  private getCategories(ids: number[]): Observable<Category[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsCategoriesRead(id)));
  }

  private getSubcategories(ids: number[]): Observable<Subcategory[]> {
    return forkJoin(ids.map(id => this.professionalsApi.professionalsSubcategoriesRead(id)));
  }

  private isNationalitiesNeed({ nationalities }: SearchService.SearchListParams) {
    return Boolean(nationalities);
  }

  private isCountryNeed({ country }: SearchService.SearchListParams) {
    return Boolean(country);
  }

  private isCityNeed({ city }: SearchService.SearchListParams): boolean {
    return Boolean(city);
  }

  private isCategoriesNeed({ categories }: SearchService.SearchListParams): boolean {
    return Boolean(categories);
  }

  private isSubcategoriesNeed({ subcategories }: SearchService.SearchListParams): boolean {
    return Boolean(subcategories);
  }

  private isLanguagesNeed({ languages }: SearchService.SearchListParams): boolean {
    return Boolean(languages);
  }
}
