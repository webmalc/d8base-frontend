import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterManagerService {

    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private master: Master;
    private readonly url = environment.backend.master;

    constructor(private client: ApiClientService, private userManager: UserManagerService) {
    }

    public updateIsMaster(): void {
        this.userManager.getCurrentUser().subscribe(
            (user: User) => {
                this.client.get(`${this.url}/${user.id}`).subscribe(
                    (master: Master) => this.isMaster$.next(true),
                    (error: HttpErrorResponse) => {
                        if (404 === error.status) {
                            this.isMaster$.next(false);
                        }

                        return of(false);
                    }
                );
            }
        );
    }

    public getCurrentMaster(): Observable<Master | null> {
        if (this.master) {
            return of(this.master);
        }

        return this.userManager.getCurrentUser().pipe(
            switchMap((user: User) => {
                return this.getMaster(user.id).pipe(
                    tap((master: Master) => this.master = master)
                );
            })
        );
    }

    public getMaster(userId: number): Observable<Master> {
        return this.client.get(`${this.url}/${userId}`).pipe(
            map(raw => plainToClass(Master, raw))
        );
    }
}
