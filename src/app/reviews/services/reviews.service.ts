import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { LocationService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ReviewsService {
  @Select(CurrentUserSelectors.defaultProfessional)
  private readonly professional$: Observable<ProfessionalList>;

  private reviewCountryCodes: { [nationality: number]: string } = {};

  constructor(private readonly locationService: LocationService) {}

  public isCurrentProfessional(professionalId: number): Observable<boolean> {
    return this.professional$.pipe(map(professional => professional?.id === professionalId));
  }

  public getReviewCountryCodeByNationality(nationality: number): Observable<string> {
    if (this.reviewCountryCodes?.[nationality]) {
      return of(this.reviewCountryCodes[nationality]);
    }

    return this.getCountryCode(nationality).pipe(
      map(countryCodeMap => {
        this.reviewCountryCodes = { ...this.reviewCountryCodes, ...countryCodeMap };
        return countryCodeMap[nationality];
      }),
    );
  }

  private getCountryCode(nationality: number): Observable<{ [nationality: number]: string }> {
    return this.locationService
      .locationCountriesRead(nationality)
      .pipe(map(country => ({ [nationality]: country.tld })));
  }
}
