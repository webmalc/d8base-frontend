import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Education} from '@app/profile/models/education';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class EducationApiService {

    private readonly url = environment.backend.education;

    constructor(private client: ApiClientService, private masterManager: MasterManagerService) {
    }

    public getCurrentMasterEducation(): Observable<Education> {
        return this.masterManager.getMasterList().pipe(
            switchMap((master: Master[]) => this.get(master[0].id))
        );
    }

    public get(masterId: number): Observable<Education> {
        return this.client.get(`${this.url}/${masterId}`).pipe(
            map(raw => plainToClass(Education, raw))
        );
    }

    public save(education: Education): Observable<Education> {
        return this.client.post(this.url, education).pipe(
            map(raw => plainToClass(Education, raw))
        );
    }
}
