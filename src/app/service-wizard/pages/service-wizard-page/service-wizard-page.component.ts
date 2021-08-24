import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service, Subcategory } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import { NavPath } from '@app/core/constants/navigation.constants';
import { IonViewDidLeave, IonViewWillEnter } from '@app/core/interfaces/ionic.interfaces';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ServiceIds } from './enums/service-ids.enum';
import { ServiceWizardStateService } from './services';

@Component({
  selector: 'app-service-wizard-page',
  templateUrl: './service-wizard-page.component.html',
})
export class ServiceWizardPage implements IonViewWillEnter, IonViewDidLeave {
  private readonly ngDestroy$ = new Subject<void>();

  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly router: Router,
    private readonly api: AccountsService,
    private readonly professionalsApi: ProfessionalsService,
    private readonly store: Store,
  ) {}

  public ionViewWillEnter(): void {
    this.setContext();
    this.subscribeSubmit();
  }

  public ionViewDidLeave(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.wizardState.reset();
  }

  private subscribeSubmit(): void {
    this.wizardState
      .submit()
      .pipe(
        map(state => Object.values(state).reduce((acc, curr) => ({ ...acc, ...curr }), {})),
        takeUntil(this.ngDestroy$),
      )
      .subscribe((service: Service) => {
        this.createService(service);
      });
  }

  private createService(service: Service): void {
    this.api.accountsServicesCreate(service).subscribe(({ id }) => {
      this.router.navigate(['/', NavPath.Service, id]);
    });
  }

  private setContext(): void {
    this.store
      .select(CurrentUserSelectors.defaultProfessional)
      .pipe(
        filter(defaultProfessional => Boolean(defaultProfessional)),
        take(1),
        map(({ subcategory }) => subcategory),
        switchMap(subcategoryId => this.professionalsApi.professionalsSubcategoriesRead(subcategoryId)),
        switchMap((subcategory: Subcategory) =>
          this.professionalsApi
            .professionalsCategoriesRead(subcategory.category)
            .pipe(map(category => ({ category, subcategory }))),
        ),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(({ category, subcategory }) => {
        this.wizardState.setContext({ [ServiceIds.Category]: { category, subcategory } });
      });
  }
}
