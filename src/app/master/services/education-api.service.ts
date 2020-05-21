import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Education} from '@app/master/models/education';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EducationApiService {

    private readonly url = environment.backend.education;

    constructor(private client: ApiClientService) { }

    public get(masterId: number): Observable<ApiListResponseInterface<Education>> {
        return this.client.get(this.url, {professional: masterId.toString(10)}).pipe(
            map((raw: ApiListResponseInterface<Education>) => {
                raw.results = plainToClass(Education, raw.results);

                return raw;
            })
        );
    }

    public create(education: Education[]): Observable<Education[]> {
        return this.client.postList<Education>(education, this.url);
    }

    public update(education: Education[]): Observable<Education[]> {
        return this.client.putList<Education>(education, this.url);
    }

    public delete(education: Education[]): Observable<Education[]> {
        return this.client.deleteList<Education>(education, this.url);
    }
}
