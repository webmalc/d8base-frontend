import {Pipe, PipeTransform} from '@angular/core';
import {ProfessionalList} from '@app/api/models';
import {MasterReadonlyApiCacheService} from '@app/core/services/cache';
import {Observable, of} from 'rxjs';

@Pipe({
    name: 'masterById$'
})
export class MasterByIdPipe implements PipeTransform {

    constructor(
        private readonly serviceCache: MasterReadonlyApiCacheService
    ) {
    }

    public transform(id: number): Observable<ProfessionalList> {
        if (!id) {
            return of<ProfessionalList>(null);
        }

        return this.serviceCache.getById(id);
    }
}
