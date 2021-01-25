import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList, ReviewList } from '@app/api/models';
import { AccountsService, LocationService, ProfessionalsService, ServicesService } from '@app/api/services';
import { CommunicationService } from '@app/api/services/communication.service';
import { HelperService } from '@app/core/services/helper.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { filter, map, share, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
})
export class ReviewsListComponent {
  public readonly ratings: number[] = [1, 2, 3, 4, 5];
  public defaultAvatar = HelperService.getNoAvatarLink();
  public readonly professionalId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ professionalId }) => professionalId),
    filter(professionalId => Boolean(professionalId)),
  );

  public readonly professional$: Observable<ProfessionalList> = this.professionalId$.pipe(
    switchMap(professionalId => this.professionalsService.professionalsProfessionalsRead(professionalId)),
  );

  public readonly reviews$: Observable<ReviewList[]> = this.professionalId$.pipe(
    switchMap(professionalId =>
      this.communicationService.communicationReviewsList({
        professional: `${professionalId}`,
      }),
    ),
    map(({ results }) => results),
    share(),
  );

  public isAbleToReview$: Observable<boolean> = this.userManagerService.getCurrentUser().pipe(
    switchMap(user =>
      !user
        ? of(false)
        : this.professionalId$.pipe(
            switchMap(professionalId =>
              forkJoin([
                this.accountsService
                  .accountsOrdersSentList({ statusIn: 'completed' })
                  .pipe(map(({ results: orders }) => orders.map(({ service }) => service))),
                this.servicesService
                  .servicesServicesList({ professional: `${professionalId}` })
                  .pipe(map(({ results: services }) => services.map(({ id }) => id))),
              ]),
            ),
            map(([completedServices, professionalServices]) =>
              Boolean(completedServices.filter(completedService => professionalServices.includes(completedService)).length),
            ),
          ),
    ),
  );

  public reviewCountryCodes: { [nationality: number]: string };
  private readonly ngDestroy$ = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly accountsService: AccountsService,
    private readonly communicationService: CommunicationService,
    private readonly professionalsService: ProfessionalsService,
    private readonly servicesService: ServicesService,
    private readonly locationService: LocationService,
    private readonly userManagerService: UserManagerService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  public ionViewWillEnter(): void {
    this.subscribeReviewCountryCodes();
  }

  public ionViewDidLeave(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private subscribeReviewCountryCodes(): void {
    this.reviews$
      .pipe(
        switchMap(reviews => {
          const uniqueNationalities = [...new Set(reviews.map(review => review.user.nationality))].filter(nationality =>
            Boolean(nationality),
          );
          return forkJoin([
            ...uniqueNationalities.map(nationality =>
              this.locationService.locationCountriesRead(nationality).pipe(map(country => ({ nationality, code: country.tld }))),
            ),
          ]).pipe(map(nationalityMapToCode => nationalityMapToCode.reduce((acc, curr) => ({ ...acc, [curr.nationality]: curr.code }), {})));
        }),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(reviewCountryCodes => {
        this.reviewCountryCodes = reviewCountryCodes;
        this.cd.markForCheck();
      });
  }
}
