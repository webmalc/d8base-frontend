import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {EducationCertificate} from '@app/profile/models/education-certificate';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class CertificateApiService {

    private readonly url = environment.backend.certificate;

    constructor(private client: ApiClientService, private masterManager: MasterManagerService) {
    }

    public get(masterId: number): Observable<EducationCertificate[]> {
        return this.client.get<EducationCertificate[]>(`${this.url}/${masterId}`).pipe(
            map((raw: EducationCertificate[]) => plainToClass(EducationCertificate, raw))
        );
    }

    public getCurrentMasterCertifications(): Observable<EducationCertificate[]> {
        return this.masterManager.getMasterList().pipe(
            switchMap((master: Master[]) => this.get(master[0].id))
        );
    }

    public save(certification: EducationCertificate[]): Observable<EducationCertificate[]> {
        return this.client.post<EducationCertificate[]>(this.url, certification).pipe(
            map((raw: EducationCertificate[]) => plainToClass(EducationCertificate, raw))
        );
    }
}
