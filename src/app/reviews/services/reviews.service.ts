import { Injectable } from '@angular/core';
import { LocationService } from '@app/api/services';
import { MasterManagerService } from '@app/core/services';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ReviewsService {
  private reviewCountryCodes: { [nationality: number]: string } = {};
  private professionalIds: number[] = [];

  constructor(
    private readonly masterManagerService: MasterManagerService,
    private readonly locationService: LocationService,
    private readonly userManager: UserManagerService,
  ) {
    this.masterManagerService.getMasterList().subscribe(professionalList => {
      this.professionalIds = professionalList.map(professional => professional.id);
    });
  }

  public getProfessionalsIds(): Observable<number[]> {
    if (this.professionalIds) {
      return of(this.professionalIds);
    }

    return this.masterManagerService.getMasterList().pipe(
      map(professionals => {
        const professionalIds = professionals.map(({ id }) => id);
        this.professionalIds = professionalIds;
        return professionalIds;
      }),
    );
  }

  public getIsInProfessionalIds(professionalId: number): Observable<boolean> {
    return this.userManager.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.getProfessionalsIds().pipe(map(professionalIds => professionalIds.includes(professionalId)));
        }
        return of(false);
      }),
    );
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
    return this.locationService.locationCountriesRead(nationality).pipe(map(country => ({ [nationality]: country.tld })));
  }
}
