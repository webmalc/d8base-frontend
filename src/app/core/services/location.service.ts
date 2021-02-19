import { Injectable } from '@angular/core';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { LocationApiServiceInterface } from '@app/shared/interfaces/location-api-service-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  public getList<T extends ClientLocationInterface>(api: LocationApiServiceInterface): Observable<ClientLocationInterface[]> {
    return this.getLocationList(api);
  }

  private getLocationList(api: LocationApiServiceInterface, id?: number): Observable<ClientLocationInterface[]> {
    return api.getByClientId(id).pipe(
      map(data => data.results),
    );
  }
}
