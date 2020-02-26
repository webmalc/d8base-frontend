import {Injectable} from '@angular/core';
import {LocationModel} from '@app/core/models/location.model';
import {ApiClientService} from '@app/core/services/api-client.service';
import {User} from '@app/shared/models/user';
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

    public saveLocation(location: LocationModel, user: User): Observable<LocationModel> {
        location.userId = user.id;

        return this.client.post<LocationModel>(this.URL, location);
    }

    public getLocation(user: User): Observable<LocationModel> {
        return this.client.get(`${this.URL}/${user.id}`).pipe(
            map(raw => plainToClass(LocationModel, raw))
        );
    }
}
