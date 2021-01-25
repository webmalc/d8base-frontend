import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList, Review, ServiceList } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { AccountsService } from '@app/api/services/accounts.service';
import { HelperService } from '@app/core/services/helper.service';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent {
  public readonly professionalId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ professionalId }) => professionalId),
    filter(professionalId => Boolean(professionalId)),
  );

  public readonly userReview$: Observable<Review> = this.professionalId$.pipe(
    switchMap(professionalId =>
      this.accountsService.accountsReviewsList({
        professional: `${professionalId}`,
      }),
    ),
    map(({ results }) => results[0]),
  );

  public service: ServiceList;
  public professional$: Observable<ProfessionalList> = this.professionalId$.pipe(
    switchMap(professionalId => this.professionalsService.professionalsProfessionalsRead(professionalId)),
  );
  public readonly rates: number[] = [1, 2, 3, 4, 5];
  public selectedRate: number;
  public defaultAvatar = HelperService.getNoAvatarLink();
  public reviewForm: FormGroup = this.fb.group({
    description: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    rating: [null, Validators.required],
  });

  private reviewSaveEndpoint: (data: Review) => Observable<Review>;
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private readonly accountsService: AccountsService,
    private readonly professionalsService: ProfessionalsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
  ) {}

  public ionViewWillEnter(): void {
    this.initForm();
  }

  public ionViewDidLeave(): void {
    this.ngUnsubscribe$.next();
  }

  public declineReviews(num: number): string {
    return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }

  public sendReview(): void {
    this.professionalId$
      .pipe(
        switchMap(professionalId =>
          this.reviewSaveEndpoint({
            ...this.reviewForm.value,
            professional: professionalId,
          }),
        ),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(() => {
        this.location.back();
      });
  }

  private initForm(): void {
    this.userReview$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(review => {
      this.reviewSaveEndpoint = review
        ? (data: Review) => this.accountsService.accountsReviewsUpdate({ data, id: review.id })
        : (data: Review) => this.accountsService.accountsReviewsCreate(data);
      ['description', 'rating'].forEach(field => {
        this.reviewForm.get(field).setValue(review?.[field] ?? null);
      });
      this.cd.markForCheck();
    });
  }
}
