import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@app/api/models';
import { ServiceEditorDepsService } from '@app/service/components/service-editor-page/service-editor-deps.service';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
import ServiceEditorContext from './service-editor-context.interface';

export abstract class ServiceEditor {
  public context$: Observable<ServiceEditorContext>;

  protected constructor(
    route: ActivatedRoute,
    protected readonly deps: ServiceEditorDepsService,
  ) {
    const service$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => deps.api.accountsServicesRead(params.id)),
    );
    this.context$ = combineLatest([service$]).pipe(
      switchMap(([service]) => forkJoin({
        service: of(service),
        form: this.createForm$(service),
      })),
      shareReplay(1),
    );
  }

  public getServicePageUrl(serviceId: number): any[] {
    return [
      '/service',
      serviceId,
      'edit',
    ];
  };

  protected saveAndReturn(sources: Observable<any>[]): void {
    forkJoin([
      this.context$.pipe(map(c => c.service), take(1)),
      ...sources,
    ]).subscribe(([service]) => {
      this.deps.router.navigate(this.getServicePageUrl(service.id));
    });
  }

  protected createForm$(service: Service): Observable<FormGroup> {
    return of(this.createForm(service));
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({});
  }
}
