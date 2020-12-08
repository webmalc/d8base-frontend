import {Injectable, OnDestroy} from '@angular/core';
import {ReadonlyApiServiceInterface} from '@app/core/interfaces/readonly-api-service-interface';
import {Observable, of} from 'rxjs';

@Injectable()
export abstract class ApiCache<T> implements OnDestroy {
    protected abstract apiService: ReadonlyApiServiceInterface<T>;
    private readonly cache = new Map<number, T>();

    public ngOnDestroy(): void {
        this.cache.clear();
    }

    public getById(id: number): Observable<T> {
        return this.cache.has(id) ? of(this.cache.get(id)) : this.apiService.getByEntityId(id);
    }
}
