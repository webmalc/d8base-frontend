import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchFilterStateService {
  public data: SearchFilterStateInterface = this.getDefaultData();
  public minDate: string;
  public maxDate: string;
  private readonly doSearch$ = new ReplaySubject<void>(1);

  public get isDoingSearch$(): Observable<void> {
    return this.doSearch$.asObservable();
  }

  constructor(private readonly router: Router) {
    this.doSearch$.subscribe(() => {
      this.router.navigate(['/search']);
    });
    this.setMinMaxDates();
  }

  public doSearch(): void {
    return this.doSearch$.next();
  }

  public setLocationData(data: SearchLocationDataInterface): void {
    this.data.main.location = data;
  }

  public setDate(datetime: SearchFilterStateInterface['main']['datetime']): void {
    this.data.main.datetime = datetime;
  }

  public clear(): void {
    this.data = this.getDefaultData();
  }

  private setMinMaxDates(): void {
    const now = new Date(Date.now());
    const limitOfYearsInFuture = 5;
    this.minDate = now.toISOString();
    this.maxDate = new Date(now.setFullYear(now.getFullYear() + limitOfYearsInFuture)).toISOString();
  }

  private getDefaultData(): SearchFilterStateInterface {
    return {
      main: {
        location: {
          country: undefined,
          city: undefined,
          coordinates: undefined,
        },
        radius: {
          distance: undefined,
          units: undefined,
        },
        category: undefined,
        subcategory: undefined,
        tags: undefined,
        isOnlineBooking: undefined,
        isInstantBooking: undefined,
        datetime: {
          from: undefined,
          to: undefined,
        },
        isOnlineService: undefined,
        isAtMasterLocationService: undefined,
        isAtClientLocationService: undefined,
        price: {
          currency: undefined,
          start: undefined,
          end: undefined,
        },
      },
      additional: {
        rating: undefined,
        professionalLevel: undefined,
        paymentMethods: undefined,
        onlyWithReviews: undefined,
        onlyWithPhotos: undefined,
        onlyWithFixedPrice: undefined,
        onlyWithCertificates: undefined,
        nationalities: undefined,
        languages: undefined,
        experience: undefined,
        startAge: undefined,
        endAge: undefined,
      },
    };
  }
}
