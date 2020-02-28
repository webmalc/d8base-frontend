import {Injectable} from '@angular/core';
import {LocationModel} from '@app/core/models/location.model';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationService} from '@app/core/services/location/location.service';
import {User} from '@app/shared/models/user';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationApiService {

    private readonly URL = environment.backend.location;

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
