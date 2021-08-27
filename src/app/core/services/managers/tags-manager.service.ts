import { Injectable } from '@angular/core';
import { ServiceTag } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { distinct, map, mergeMap, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class TagsManagerService {
  public tags$: Observable<ServiceTag[]>;

  private readonly serviceId$ = new Subject<number>();
  private readonly update$ = new Subject<void>();

  constructor(private readonly api: AccountsService) {
    const serviceId$ = combineLatest([this.serviceId$.pipe(distinct()), this.update$.pipe(startWith(0))]).pipe(
      map(([serviceId]) => serviceId),
    );

    this.tags$ = serviceId$.pipe(
      switchMap(serviceId => this.api.accountsServiceTagsList({ service: serviceId })),
      map(response => response.results),
      shareReplay(1),
    );
  }

  public getServiceTags(serviceId: number): Observable<ServiceTag[]> {
    this.serviceId$.next(serviceId);
    return this.tags$;
  }

  public updateTags(serviceId: number, tags: ServiceTag[]): Observable<ServiceTag[]> {
    return this.getServiceTags(serviceId).pipe(
      take(1),
      mergeMap(oldTags => {
        const newTags = tags.filter(tag => !oldTags.find(x => x.name === tag.name));
        const removedTags = oldTags.filter(tag => !tags.find(x => x.name === tag.name));
        const createNewTags$ = newTags.map(tag => this.api.accountsServiceTagsCreate({ ...tag, service: serviceId }));
        const removeOldTags$ = removedTags.filter(tag => tag.id).map(tag => this.api.accountsServiceTagsDelete(tag.id));
        const updateTags$ = [...createNewTags$, ...removeOldTags$];
        return updateTags$.length > 0 ? forkJoin(updateTags$) : of<null>();
      }),
      tap(() => this.updateService()),
    );
  }

  private updateService(): void {
    this.update$.next();
  }
}
