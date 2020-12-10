import {Pipe, PipeTransform} from '@angular/core';
import {MasterList} from '@app/master/models/master-list';
import {MasterReadonlyApiCacheService} from '@app/my-orders/services';
import {Observable, of} from 'rxjs';

@Pipe({
    name: 'masterById$'
})
export class MasterByIdPipe implements PipeTransform {

    constructor(
        private readonly serviceCache: MasterReadonlyApiCacheService
    ) {
    }

    public transform(id: number): Observable<MasterList> {
        if (!id) {
            return of<MasterList>(null);
        }

        return this.serviceCache.getById(id);
    }
}
