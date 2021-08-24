import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@app/api/models';
import { ServiceEditorDepsService } from '@app/service/pages/service-editor-page/service-editor-deps.service';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { filter, finalize, map, shareReplay, switchMap, take } from 'rxjs/operators';
import ServiceEditorContext from './service-editor-context.interface';

export abstract class ServiceEditor {
  public context$: Observable<ServiceEditorContext>;
  public pending: boolean = false;

  protected constructor(route: ActivatedRoute, protected readonly deps: ServiceEditorDepsService) {
    const service$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => deps.api.accountsServicesRead(params.id)),
    );
    this.context$ = combineLatest([service$]).pipe(
      switchMap(([service]) =>
        forkJoin({
          service: of(service),
          form: this.createForm$(service),
        }),
      ),
      shareReplay(1),
    );
  }

  public getServicePageUrl(serviceId: number): string {
    return `/service/${serviceId}/edit`;
  }

  protected saveAndReturn(sources: Observable<any>[]): void {
    this.pending = true;
    forkJoin([
      this.context$.pipe(
        map(c => c.service),
        take(1),
      ),
      ...sources,
    ])
      .pipe(finalize(() => (this.pending = false)))
      .subscribe(([service]) => {
        this.deps.router.navigateByUrl(this.getServicePageUrl(service.id));
      });
  }

  protected createForm$(service: Service): Observable<FormGroup> {
    return of(this.createForm(service));
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({});
  }
}
