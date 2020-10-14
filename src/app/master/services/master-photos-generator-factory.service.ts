import {Injectable} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {MasterPhoto} from '@app/master/models/master-photo';
import {MasterPhotosApiService} from '@app/master/services/master-photos-api.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MasterPhotosGeneratorFactoryService {

    constructor(
        private masterPhotosApi: MasterPhotosApiService,
        private masterManager: MasterManagerService
    ) {
    }

    public getPhotos(masterId?: number): Observable<MasterPhoto[]> {
        return masterId ? this.get(masterId) : this.masterManager.getMasterList().pipe(switchMap(list => this.get(list[0].id)));
    }

    private get(masterId: number): Observable<MasterPhoto[]> {
        return this.masterPhotosApi.get({professional: masterId.toString()}).pipe(map(res => res.results));
    }
}