import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterGuard implements CanActivate {
    constructor(private readonly masterManager: MasterManagerService, private readonly location: Location) {
    }

    public canActivate(): Observable<boolean | UrlTree> {
        return new Observable<UrlTree | boolean>(subscriber => {
            this.masterManager.isMaster$.subscribe(
                (isMaster: boolean) => {
                    if (!isMaster) {
                        this.location.back();
                        subscriber.next(false);
                    } else {
                        subscriber.next(true);
                    }
                    subscriber.complete();
                }
            );
        });
    }
}

