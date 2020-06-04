import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MasterInterface} from '@app/core/interfaces/master.interface';

@Injectable({
    providedIn: 'root'
})
export class MasterManagerService {

    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly url = environment.backend.master;
    private readonly masterListUrl = environment.backend.master_list;

    constructor(private client: ApiClientService, private userManager: UserManagerService) {
    }

    public updateIsMaster(): void {
        this.userManager.getCurrentUser().subscribe(
            (user: User) => {
                if (TypeOfUser.Master === user.account_type) {
                    return this.isMaster$.next(true);
                }
                this.isMaster$.next(false);
            }
        );
    }

    public becomeMaster(): Observable<User> {
        return this.userManager.becomeMaster().pipe(
            tap(_ => this.updateIsMaster())
        );
    }

    public getMasterList(): Observable<Master[]> {
        return this.client.get(this.url).pipe(
            map((data: ApiListResponseInterface<Master>) => data.results)
        );
    }

    public updateMaster(master: Master): Observable<Master> {
        return this.client.put(`${this.url}${master.id}/`, master).pipe(
            map(raw => plainToClass(Master, raw))
        );
    }

    public saveMaster(master: Master): Observable<Master> {
        return this.client.post(this.url, master).pipe(
            map(raw => plainToClass(Master, raw))
        );
    }

    public getMaster(masterId?: number): Observable<Master> {
        return this.client.get(`${this.url}${masterId}/`).pipe(
            map(raw => plainToClass(Master, raw))
        );
    }

    public getUserLessList$(ids: number[]): Observable<MasterInterface[]> {
        return this.client
            .get<ApiListResponseInterface<MasterInterface>>(this.masterListUrl, {pk_in: ids.join(',')})
            .pipe(
                map((data) => data.results)
            );
    }
}
