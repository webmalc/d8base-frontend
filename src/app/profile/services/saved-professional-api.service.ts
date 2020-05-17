import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class SavedProfessionalApiService {
    private url: string = environment.backend.saved_professionals;

    constructor(private api: ApiClientService) {
    }

    public getAll$(): Observable<SavedProfessionalInterface<number>[]> {
        return this.api.get<ApiListResponseInterface<SavedProfessionalInterface<number>>>(this.url)
            .pipe(
                map((raw: ApiListResponseInterface<SavedProfessionalInterface<number>>) => raw.results)
            );
    }

    public create(professional: Master, note: string = ''): Observable<SavedProfessionalInterface<number>> {
        return this.api.post<SavedProfessionalInterface<number>>(this.url, {
            professional: professional.id,
            note
        });
    }

    public getById(id: number): Observable<SavedProfessionalInterface<number>> {
        return this.api.get(`${this.url}${id}/`);
    }

    public remove(saved: SavedProfessionalInterface<Master>): Observable<void> {
        return this.api.delete(`${this.url}${saved.id}/`);
    }

    public update(saved: SavedProfessionalInterface<number>): Observable<SavedProfessionalInterface<number>> {
        return this.api.patch(this.url, saved);
    }
}
