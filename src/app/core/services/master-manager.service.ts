import {Injectable} from '@angular/core';
import {ProfessionalList} from '@app/api/models/professional-list';
import {once} from '@app/core/decorators/once';
import {Master} from '@app/core/models/master';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterApiService} from '@app/master/services/master-api.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MasterManagerService {

    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly userManager: UserManagerService,
        private readonly auth: AuthenticationService,
        private readonly masterApi: MasterApiService,
        private readonly masterReadonlyApi: MasterReadonlyApiService
    ) {
    }

    @once
    public subscribeToAuth(): void {
        this.auth.isAuthenticated$.subscribe(isAuth => isAuth ? this.updateIsMaster() : this.isMaster$.next(false));
    }

    public updateIsMaster(): void {
        this.isMaster().subscribe(isMaster => this.isMaster$.next(isMaster));
    }

    public isMaster(): Observable<boolean> {
        return this.userManager.getCurrentUser().pipe(map(user => user.account_type === TypeOfUser.Master),
            catchError(_ => of(false)));
    }

    public getMasterList(): Observable<ProfessionalList[]> {
        return this.masterApi.get().pipe(map(data => data.results));
    }

    public updateMaster(master: Master): Observable<Master> {
        return this.masterApi.put(master);
    }

    public createMaster(master: ProfessionalList): Observable<Master> {
        return this.masterApi.create(master);
    }

    public getMaster(masterId?: number): Observable<Master> {
        return this.masterApi.getByEntityId(masterId);
    }

    public getUserLessList$(ids: number[]): Observable<ProfessionalList[]> {
        return this.masterReadonlyApi.getList(ids);
    }

    public getExperienceLevelList(): Observable<{ value: string, display_name: string }[]> {
        return this.masterApi.options<{ actions: { POST: { level: { choices: { value: string, display_name: string }[] } } } }>().pipe(
            map((data) => data.actions.POST.level.choices)
        );
    }
}
