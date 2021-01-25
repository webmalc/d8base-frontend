import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { Service } from '@app/service/models/service';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import ServiceEditorContext from './service-editor-context.interface';

export abstract class ServiceEditor {
  public context$: Observable<ServiceEditorContext>;

  protected constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly servicesApi: ServicesApiService,
  ) {
    this.context$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => servicesApi.getByEntityId(params.id)),
      map(service => ({ service, form: this.createForm(service) })),
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
    this.servicesApi.put(service).subscribe(() =>
      this.router.navigate(this.getServicePageUrl(service.id)),
    );
  }

  protected abstract createForm(service: Service): FormGroup;
}
