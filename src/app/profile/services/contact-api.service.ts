import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {Contact} from '@app/profile/models/contact';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {User} from '@app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class ContactApiService {

    private readonly url = environment.backend.contact;

    constructor(private api: ApiClientService, private userManager: UserManagerService) {
    }

    public getByUserId(userId: number): Observable<Contact> {
        return this.api.get<Contact>(`${this.url}/${userId}`).pipe(
            map(
                raw => plainToClass(Contact, raw)
            )
        );
    }

    public save(contact: Contact, userId: number): Observable<Contact> {
        contact.user_id = userId;

        return this.api.post<Contact>(this.url, contact).pipe(
            map(
                raw => plainToClass(Contact, raw)
            )
        );
    }

    public getCurrentUserContact(): Observable<Contact> {
        return this.userManager.getCurrentUser().pipe(
            switchMap(
                (user: User) => {
                    return this.getByUserId(user.id);
                }
            )
        );
    }

    public saveCurrentUserContact(contact: Contact): Observable<Contact> {
        return this.userManager.getCurrentUser().pipe(
            switchMap(
                (user: User) => {
                    return this.save(contact, user.id);
                }
            )
        );
    }
}
