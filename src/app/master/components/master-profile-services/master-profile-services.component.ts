import { Component } from '@angular/core';
import { Service } from '@app/api/models';
import ServiceData from '@app/core/interfaces/service-data.interface';
import { ServiceOperationsService } from '@app/core/services/service-operations.service';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-services',
  templateUrl: './master-profile-services.component.html',
  styleUrls: ['./master-profile-services.component.scss'],
})
export class MasterProfileServicesComponent {

  public searchModel: string;
  public serviceData$: Observable<ServiceData[]>;

  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly serviceGeneratorFactory: ServicesGeneratorFactoryService,
    private readonly serviceOperations: ServiceOperationsService,
  ) {
    this.serviceData$ = combineLatest([this.context$, this.refresh$]).pipe(
      filter(([context]) => !!context.professional),
      switchMap(([context]) => this.serviceGeneratorFactory.getServiceList(context.professional.id, !context.canEdit)),
    );
  }

  public enableService(service: Service): void {
    this.serviceOperations.enableService(service).subscribe(() => this.refresh$.next());
  }

  public disableService(service: Service): void {
    this.serviceOperations.disableService(service).subscribe(() => this.refresh$.next());
  }

  public deleteService(service: Service): void {
    this.serviceOperations.deleteService(service.id).subscribe(() => this.refresh$.next());
  }

  public search(event: CustomEvent): void {
    this.searchModel = event.detail.value;
  }

  public clearSearchModel(): void {
    this.searchModel = '';
  }
}
