import { Injectable } from '@angular/core';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { UserLocationApiService } from '@app/core/services/location/user-location-api.service';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {

  private readonly STORAGE_KEY = 'timezones';

  constructor(private readonly storageManager: StorageManagerService, private readonly userLocationApiService: UserLocationApiService) {
  }

  public getTimezoneList(): Observable<{ value: string, display_name: string }[]> {
    return from(this.storageManager.get(this.STORAGE_KEY)).pipe(
      switchMap((data: { value: string, display_name: string }[]) => {
        if (data === null) {
          return this.userLocationApiService.getTimeZoneList().pipe(
            tap(list => this.storageManager.set(this.STORAGE_KEY, list)),
          );
        }

        return of(data);
      }),
    );
  }
}
