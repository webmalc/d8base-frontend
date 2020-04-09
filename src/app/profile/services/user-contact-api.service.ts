import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserContact} from '@app/profile/models/user-contact';
import {plainToClass} from 'class-transformer';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserContactApiService {

    private readonly url = environment.backend.user_contact;

    constructor(private api: ApiClientService) {
    }

    public getByUserId(userId: number): Observable<ApiListResponseInterface<UserContact>> {
        return this.api.get<ApiListResponseInterface<UserContact>>(`${this.url}/${userId}`).pipe(
            map(response => {
                response.results = plainToClass(UserContact, response.results);

                return response;
            })
        );
    }

    public save(contactsList: UserContact[]): Observable<UserContact[]> {
        return 0 === contactsList.length ? of([]) : of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.post<UserContact>(this.url, contact))
            ))
        );
    }

    public update(contactsList: UserContact[]): Observable<UserContact[]> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.put<UserContact>(`${this.url}${contact.id}/`, contact))
            ))
        );
    }

    public delete(contactsList: UserContact[]): Observable<any> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.api.delete(`${this.url}${contact.id}/`))
            ))
        );
    }

    public getCurrentUserContact(): Observable<ApiListResponseInterface<UserContact>> {
        return this.api.get<ApiListResponseInterface<UserContact>>(this.url).pipe(
            map(response => {
                response.results = plainToClass(UserContact, response.results);

                return response;
            })
        );
    }
}
