import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {map} from 'rxjs/operators';
import {Master} from '@app/core/models/master';

@Injectable()
export class SavedProfessionalApiService {
    private url: string = environment.backend.saved_professionals;

    constructor(private api: ApiClientService) {
    }

    public getAll$(): Observable<SavedProfessionalInterface<number>[]> {
        return this.api.get<ApiListResponseInterface<SavedProfessionalInterface<number>>>(this.url)
            .pipe(
                map((raw) => raw.results)
            );
    }

    public create(professional: Master, note: string = ''): Observable<SavedProfessionalInterface<number>> {
        return this.api.post<SavedProfessionalInterface<number>>(this.url, {
            professional: professional.id,
            note
        });
    }

    public getSavedById(id: number): Observable<SavedProfessionalInterface<number>> {
        return this.api.get(this.url, {id: id.toString()});
    }

    public removeSaved(saved: SavedProfessionalInterface<any>): Observable<void> {
        return this.api.delete(this.url, {id: saved.id.toString()});
    }
}
