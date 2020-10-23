import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {MasterInterface} from '@app/core/interfaces/master.interface';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class SavedProfessionalApiService {
    private readonly url: string = environment.backend.saved_professionals;

    constructor(private readonly api: ApiClientService) {
    }

    public getAll$(): Observable<SavedProfessionalInterface<number>[]> {
        return this.api.get<ApiListResponseInterface<SavedProfessionalInterface<number>>>(this.url)
            .pipe(
                map((raw: ApiListResponseInterface<SavedProfessionalInterface<number>>) => raw.results)
            );
    }

    public create(savedProfessional: SavedProfessionalInterface<number>): Observable<SavedProfessionalInterface<number>> {
        return this.api.post(this.url, savedProfessional);
    }

    public getById(id: number): Observable<SavedProfessionalInterface<number>> {
        return this.api.get(`${this.url}${id}/`);
    }

    public remove(saved: SavedProfessionalInterface<Master>): Observable<void> {
        return this.api.delete(`${this.url}${saved.id}/`);
    }

    public removeById(id: number): Observable<void> {
        return this.api.delete(`${this.url}${id}/`);
    }

    public update(saved: SavedProfessionalInterface<number>): Observable<SavedProfessionalInterface<number>> {
        return this.api.patch<SavedProfessionalInterface<number>>(this.url, saved);
    }

    public createFromMaster(master: MasterInterface, note: string): Observable<SavedProfessionalInterface<number>> {
        const bookmark = this.createBookmark(master.id, note);

        return this.api.post(this.url, bookmark);
    }

    private createBookmark(masterId: number, note: string): SavedProfessionalInterface<number> {
        return {
            id: null,
            professional: masterId,
            note
        };
    }
}
