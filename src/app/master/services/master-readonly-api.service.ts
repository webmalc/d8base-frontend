import {Injectable} from '@angular/core';
import {ProfessionalList} from '@app/api/models';
import {ProfessionalsService} from '@app/api/services/professionals.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ReadonlyApiServiceInterface} from '@app/core/interfaces/readonly-api-service-interface';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MasterReadonlyApiService implements ReadonlyApiServiceInterface<ProfessionalList> {
    constructor(private readonly professionalsService: ProfessionalsService) {
    }

    public get(params?: { [p: string]: string | string[] | boolean }): Observable<ApiListResponseInterface<ProfessionalList>> {
        return this.professionalsService.professionalsProfessionalsList(params ?? {});
    }

    public getByEntityId(entityId: number): Observable<ProfessionalList> {
        return this.professionalsService.professionalsProfessionalsRead(entityId);
    }

    public getList(ids: number[]): Observable<ProfessionalList[]> {
        return ids.length ? this.professionalsService.professionalsProfessionalsRead(ids[0]).pipe(map(x => [x])) : of([]);
    }
}
