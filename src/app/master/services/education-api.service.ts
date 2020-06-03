import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Education} from '@app/master/models/education';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class EducationApiService implements Partial<ApiServiceInterface<Education>> {

    private readonly url = environment.backend.education;

    constructor(private client: ApiClientService) { }

    public get(masterId: number): Observable<ApiListResponseInterface<Education>> {
        return this.client.get(this.url, {professional: masterId?.toString(10)}).pipe(
            map((raw: ApiListResponseInterface<Education>) => {
                raw.results = plainToClass(Education, raw.results);

                return raw;
            })
        );
    }

    public create(education: Education): Observable<Education> {
        return this.client.post<Education>(this.url, education).pipe(
            map(raw => plainToClass(Education, raw))
        );
    }

    public patch(education: Education): Observable<Education> {
        return this.client.patch<Education>(`${this.url + education.id}/`, education).pipe(
            map(raw => plainToClass(Education, raw))
        );
    }

    public delete(education: Education): Observable<Education> {
        return this.client.delete(`${this.url + education.id}/`);
    }
}
