import { Injectable } from '@angular/core';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { Experience } from '@app/master/models/experience';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MasterExperienceReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByMasterId(id: number): Observable<ApiListResponseInterface<Experience>> {
        return this.client.get<{ experience_entries: Experience[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({ count: data.experience_entries.length, results: data.experience_entries, next: null, previous: null})),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Experience | Experience[]): Experience | Experience[] {
        return plainToClass(Experience, data);
    }
}
