import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterApiService} from '@app/master/services/master-api.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MasterManagerService { // TODO: refactor with masterApiService

    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private userManager: UserManagerService,
        private auth: AuthenticationService,
        private masterApi: MasterApiService,
        private masterReadonlyApi: MasterReadonlyApiService
    ) {
    }

    public subscribeToAuth(): void {
        this.auth.isAuthenticated$.subscribe(isAuth => isAuth ? this.updateIsMaster() : this.isMaster$.next(false));
    }

    public updateIsMaster(): void {
        this.isMaster().subscribe(isMaster => this.isMaster$.next(isMaster));
    }

    public isMaster(): Observable<boolean> {
        return this.userManager.getCurrentUser().pipe(map(user => user.account_type === TypeOfUser.Master));
    }

    public becomeMaster(): Observable<User> {
        return this.userManager.becomeMaster().pipe(tap(_ => this.updateIsMaster()));
    }

    public getMasterList(): Observable<Master[]> {
        return this.masterApi.get().pipe(map((data: ApiListResponseInterface<Master>) => data.results));
    }

    public updateMaster(master: Master): Observable<Master> {
        return this.masterApi.put(master);
    }

    public createMaster(master: Master): Observable<Master> {
        return this.masterApi.create(master);
    }

    public getMaster(masterId?: number): Observable<Master> {
        return this.masterApi.getByEntityId(masterId);
    }

    public getUserLessList$(ids: number[]): Observable<Master[]> {
        return this.masterReadonlyApi.getList(ids);
    }

    public getExperienceLevelList(): Observable<{ value: string, display_name: string }[]> {
        return this.masterApi.options<{ actions: { POST: { level: { choices: { value: string, display_name: string }[] } } } }>().pipe(
            map((data) => data.actions.POST.level.choices)
        );
    }
}
