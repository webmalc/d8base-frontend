import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profile } from '@app/api/models';
import { LocationService } from '@app/core/services/location.service';
import { UserLocationApiService } from '@app/core/services/location/user-location-api.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {

  public form: FormGroup;

  constructor(
    private readonly userManager: UserManagerService,
    private readonly locationService: LocationService,
    private readonly userLocationApi: UserLocationApiService,
  ) {
  }

  public initLocation(): Observable<ClientLocationInterface[]> {
    return this.locationService.getList(this.userLocationApi).pipe(
      map(locationList => {
        if (locationList.length === 1) {
          return locationList;
        }
        locationList.sort((a, b) => {
          if (a.is_default) {
            return 1;
          }
          if (b.is_default) {
            return -1;
          }
        });

        return locationList;
      }),
    );
  }

  public updateUser(user: Partial<Profile>): void {
    this.userManager.updateUser(user);
  }
}
