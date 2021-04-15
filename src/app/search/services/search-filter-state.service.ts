import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { Observable, ReplaySubject } from 'rxjs';
import { SearchFilterStateConverter } from './search-filter-state-converter.service';

@Injectable()
export class SearchFilterStateService {
  public searchForm: FormGroup = this.fb.group({
    query: null,
    location: this.fb.group({
      country: null,
      city: null,
      coordinates: null,
    }),
    category: null,
    subcategory: null,
    tags: null,
    isOnlineBooking: null,
    isInstantBooking: null,
    datetime: this.fb.group({
      from: null,
      to: null,
    }),
    isOnlineService: null,
    isAtMasterLocationService: null,
    isAtClientLocationService: null,
    price: this.fb.group({
      currency: null,
      start: null,
      end: null,
    }),
    rating: null,
    professionalLevel: null,
    paymentMethods: null,
    onlyWithReviews: null,
    onlyWithPhotos: null,
    onlyWithFixedPrice: null,
    onlyWithCertificates: null,
    nationalities: null,
    languages: null,
    experience: null,
    startAge: null,
    endAge: null,
  });

  public minDate: string;
  public maxDate: string;
  private readonly doSearch$ = new ReplaySubject<void>(1);

  public get isDoingSearch$(): Observable<void> {
    return this.doSearch$.asObservable();
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
  ) {
    this.doSearch$.subscribe(() => {
      const queryParams = this.searchFilterStateConverter.getSearchListParams(this.searchForm.value);
      this.router.navigate(['/search'], { queryParams });
    });
    this.setMinMaxDates();
  }

  public doSearch(): void {
    return this.doSearch$.next();
  }

  public setLocationData(data: SearchLocationDataInterface): void {
    this.searchForm.get('location').setValue(data);
  }

  public setDate(datetime: SearchFilterStateInterface['datetime']): void {
    this.searchForm.get('datetime').setValue(datetime);
  }

  public clear(): void {
    this.searchForm.reset();
  }

  private setMinMaxDates(): void {
    const now = new Date(Date.now());
    const limitOfYearsInFuture = 5;
    this.minDate = now.toISOString();
    this.maxDate = new Date(now.setFullYear(now.getFullYear() + limitOfYearsInFuture)).toISOString();
  }
}
