import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Contact} from '@app/profile/models/contact';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactApiService {

    private readonly url = environment.backend.contact;

    constructor(private client: ApiClientService) {
    }

    public get(params?: {
        by_country?: string,
        countries?: string;
        excluded_countries?: string,
        search?: string,
        ordering?: string,
        page?: string,
        page_size?: string
    }): Observable<ApiListResponseInterface<Contact>> {
        return this.client.get<ApiListResponseInterface<Contact>>(this.url, params).pipe(
            map(response => {
                response.results = plainToClass(Contact, response.results);

                return response;
            })
        );
    }
}
