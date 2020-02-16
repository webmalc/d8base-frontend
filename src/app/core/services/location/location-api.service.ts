import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationModel} from '@app/core/models/location.model';
import {environment} from '../../../../environments/environment';
import {LocationService} from '@app/core/services/location/location.service';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '@app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class LocationApiService {

    private readonly URL = environment.backend.api_save_location_url;

    constructor(private client: ApiClientService, private location: LocationService) {
    }

    public saveCurrentLocation(user: User): Observable<any> {
        return from(this.location.getMergedLocationData()).pipe(
            switchMap(
                (location: LocationModel) => {
                    return this.saveLocation(location, user);
                }
            )
        );
    }

    public saveLocation(location: LocationModel, user: User): Observable<any> {
        location.userId = user.id;

        return this.client.post(this.URL, location);
    }
}
