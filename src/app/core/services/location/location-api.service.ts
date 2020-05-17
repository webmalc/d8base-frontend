import {Injectable} from '@angular/core';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationApiService {

    private readonly URL = environment.backend.location;

    constructor(private client: ApiClientService) {
    }

    public saveLocation(location: ClientLocationInterface, user?: User): Observable<ClientLocationInterface> {
        return this.client.post<ClientLocationInterface>(this.URL, location);
    }

    public getLocation(user: User): Observable<UserLocation> {
        return this.client.get(`${this.URL}/${user.id}`).pipe(
            map(raw => plainToClass(UserLocation, raw))
        );
    }
}
