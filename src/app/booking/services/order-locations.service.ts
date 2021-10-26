import { Injectable } from '@angular/core';
import { ProfessionalLocationInline, ServiceList } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { LocationResolverService } from '@app/core/services';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface LocationRepresentation {
  id: number;
  text: string;
}

@Injectable()
export class OrderLocationsService {
  constructor(private readonly locationResolver: LocationResolverService, private readonly api: AccountsService) {}

  public getLocations(service: ServiceList): Observable<LocationRepresentation[]> {
    if (service.service_type === 'online') {
      return of([]);
    } else if (service.service_type === 'professional') {
      return this.getServiceLocations(service);
    } else if (service.service_type === 'client') {
      return this.getClientLocations();
    }
  }

  private getServiceLocations(service: ServiceList): Observable<LocationRepresentation[]> {
    const locationsObservables = service.locations.map(serviceLocation => {
      const { id, location } = serviceLocation;
      return this.locationResolver.getTextLocation({ ...location, id });
    });
    if (locationsObservables.length === 0) {
      return of([]);
    }
    return forkJoin(locationsObservables);
  }

  private getClientLocations(): Observable<any> {
    return this.api
      .accountsLocationsList({})
      .pipe(
        switchMap(({ results: locations }) =>
          locations.length > 0
            ? forkJoin(
                locations.map(location =>
                  this.locationResolver.getTextLocation((location as unknown) as ProfessionalLocationInline),
                ),
              )
            : of([]),
        ),
      );
  }
}
