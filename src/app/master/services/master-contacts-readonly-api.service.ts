import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterContact} from '@app/master/models/master-contact';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MasterContactsReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByClientId(id: number): Observable<ApiListResponseInterface<MasterContact>> {
        return this.client.get<{ contacts: MasterContact[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({count: data.contacts.length, results: data.contacts, next: null, previous: null})),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: MasterContact | MasterContact[]): MasterContact | MasterContact[] {
        return plainToClass(MasterContact, data);
    }
}
