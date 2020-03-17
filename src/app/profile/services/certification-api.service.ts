import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Certification} from '@app/profile/models/certification';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Master} from '@app/core/models/master';

@Injectable()
export class CertificationApiService {

    private readonly url = environment.backend.certification;

    constructor(private client: ApiClientService, private masterManager: MasterManagerService) {
    }

    public get(masterId: number): Observable<Certification[]> {
        return this.client.get<Certification[]>(`${this.url}/${masterId}`).pipe(
            map((raw: Certification[]) => plainToClass(Certification, raw))
        );
    }

    public getCurrentMasterCertifications(): Observable<Certification[]> {
        return this.masterManager.getCurrentMaster().pipe(
            switchMap((master: Master) => this.get(master.id))
        );
    }

    public save(certification: Certification[]): Observable<Certification[]> {
        return this.client.post<Certification[]>(this.url, certification).pipe(
            map((raw: Certification[]) => plainToClass(Certification, raw))
        );
    }
}
