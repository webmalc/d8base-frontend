import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@app/api/models';
import { ServiceEditorDepsService } from '@app/service/components/service-editor-page/service-editor-deps.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import ServiceEditorContext from './service-editor-context.interface';

export abstract class ServiceEditor {
  public context$: Observable<ServiceEditorContext>;

  protected constructor(
    route: ActivatedRoute,
    private readonly deps: ServiceEditorDepsService,
  ) {
    const service$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => deps.api.accountsServicesRead(params.id)),
    );
    this.context$ = combineLatest([service$]).pipe(
      map(([service]) => ({ service, form: this.createForm(service) })),
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

  protected saveAndReturn(service: Service): void {
    this.deps.api.accountsServicesUpdate({ id: service.id, data: service }).subscribe(() => {
      this.deps.router.navigate(this.getServicePageUrl(service.id));
    });
  }

  protected abstract createForm(service: Service): FormGroup;
}
