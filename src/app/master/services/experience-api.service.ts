import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Experience} from '@app/master/models/experience';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class ExperienceApiService implements Partial<ApiServiceInterface<Experience>> {

    private readonly url = environment.backend.experience;

    constructor(private client: ApiClientService) { }

    public get(masterId: number): Observable<ApiListResponseInterface<Experience>> {
        return this.client.get(this.url, {professional: masterId?.toString(10)}).pipe( // nullable masterId only for tests
            map((raw: ApiListResponseInterface<Experience>) => {
                raw.results = plainToClass(Experience, raw.results);

                return raw;
            })
        );
    }

    public create(experience: Experience): Observable<Experience> {
        return this.client.post<Experience>(this.url, experience).pipe(
            map(raw => plainToClass(Experience, raw))
        );
    }

    public patch(experience: Experience): Observable<Experience> {
        return this.client.patch<Experience>(`${this.url + experience.id}/`, experience).pipe(
            map(raw => plainToClass(Experience, raw))
        );
    }

    public delete(experience: Experience): Observable<Experience> {
        return this.client.delete(`${this.url + experience.id}/`);
    }
}
