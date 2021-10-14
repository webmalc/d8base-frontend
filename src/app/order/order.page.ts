import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalList, Profile, SentOrder } from '@app/api/models';
import { AccountsService, ProfessionalsService, ServicesService } from '@app/api/services';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';
import { toNumber } from '@app/core/functions/string.functions';
import { NgDestroyService } from '@app/core/services';
import { ServicesApiCache } from '@app/core/services/cache';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { OrderWizardStateService } from './services';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  providers: [ServicesApiCache, NgDestroyService],
})
export class OrderPage {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(CurrentUserSelectors.defaultProfessional)
  public currentProfessional$: Observable<ProfessionalList>;

  private serviceId: number;
  private isSelfOrder: boolean = false;

  constructor(
    private readonly wizardState: OrderWizardStateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly servicesApi: ServicesService,
    private readonly professionalsServiceApi: ProfessionalsService,
    private readonly accountsServiceApi: AccountsService,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.subscribeToRouteParams();
    this.subscribeSubmit();
  }

  private subscribeSubmit(): void {
    this.wizardState
      .submit()
      .pipe(
        map(state =>
          Object.values(state).reduce((acc, curr) => ({ ...acc, ...curr }), {
            service: this.serviceId,
          }),
        ),
        takeUntil(this.ngDestroy$),
      )
      .subscribe((order: SentOrder) => {
        this.createOrder(order);
      });
  }

  private createOrder(order: SentOrder): void {
    const orderCreateParams: SentOrder = {
      ...order,
      ...(this.isSelfOrder ? { source: 'manual' } : {}),
    };
    this.accountsServiceApi.accountsOrdersSentCreate(orderCreateParams).subscribe(({ id }) => {
      this.router.navigate(['/', NavPath.Orders, NavBranch.Outbox, id]);
    });
  }

  private setContext(serviceId: number): void {
    combineLatest([
      this.servicesApi.servicesServicesRead(serviceId).pipe(
        switchMap(service =>
          this.professionalsServiceApi.professionalsProfessionalsRead(service.professional).pipe(
            map(professional => ({
              service,
              professional,
            })),
          ),
        ),
      ),
      this.profile$,
      this.currentProfessional$,
    ])
      .pipe(first())
      .subscribe(async ([{ service, professional }, client, currentProfessional]) => {
        this.isSelfOrder = professional?.id === currentProfessional?.id;
        await this.wizardState.setContext({
          service,
          professional,
          client,
          isSelfOrder: this.isSelfOrder,
        });
      });
  }

  private subscribeToRouteParams(): void {
    this.route.params
      .pipe(
        map(({ serviceId }) => serviceId),
        filter(serviceId => Boolean(serviceId)),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(serviceId => {
        this.serviceId = toNumber(serviceId);
        this.setContext(serviceId);
      });
  }
}
