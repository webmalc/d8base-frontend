import { Component } from '@angular/core';
import ServiceData from '@app/core/interfaces/service-data.interface';
import { ServiceOperationsService } from '@app/core/services/service-operations.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import { Service } from '@app/service/models/service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-services',
  templateUrl: './master-profile-services.component.html',
  styleUrls: ['./master-profile-services.component.scss'],
})
export class MasterProfileServicesComponent {

  public searchModel: string;
  public serviceData$: Observable<ServiceData[]>;
  public context$: Observable<MasterProfileContext>;

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly serviceGeneratorFactory: ServicesGeneratorFactoryService,
    private readonly serviceOperations: ServiceOperationsService,
    contextService: MasterProfileContextService,
  ) {
    this.context$ = contextService.context$;
    this.serviceData$ = combineLatest([this.context$, this.refresh$]).pipe(
      first(([context]) => !!context.master),
      switchMap(([context]) => this.serviceGeneratorFactory.getServiceList(context.master.id)),
    );
  }

  public enableService(service: Service): void {
    this.serviceOperations.enableService(service).subscribe(() => this.refresh$.next());
  }

  public disableService(service: Service): void {
    this.serviceOperations.disableService(service).subscribe(() => this.refresh$.next());
  }

  public deleteService(service: Service): void {
    this.serviceOperations.deleteService(service).subscribe(() => this.refresh$.next());
  }

  public search(event: CustomEvent): void {
    this.searchModel = event.detail.value;
  }

  public clearSearchModel(): void {
    this.searchModel = '';
  }
}
