import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalList, ReviewComment, ReviewList, ServiceList } from '@app/api/models';
import { CommunicationService, ProfessionalsService } from '@app/api/services';
import { AccountsService } from '@app/api/services/accounts.service';
import { HelperService } from '@app/core/services/helper.service';
import { NavController } from '@ionic/angular';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-review-comment',
  templateUrl: './edit-review-comment.component.html',
  styleUrls: ['./edit-review-comment.component.scss'],
})
export class EditReviewCommentComponent implements OnInit, OnDestroy {
  public readonly professionalId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ professionalId }) => professionalId),
    filter(professionalId => Boolean(professionalId)),
  );
  public readonly reviewId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ reviewId }) => reviewId),
    filter(reviewId => Boolean(reviewId)),
  );

  public readonly review$: Observable<ReviewList> = of(null).pipe(
    switchMap(() => {
      const reviewFromRouterData: ReviewList = this.router.getCurrentNavigation().extras?.state?.review;
      if (reviewFromRouterData) {
        return of(reviewFromRouterData);
      }

      return this.reviewFromBackend$;
    }),
    filter(review => Boolean(review)),
  );

  public readonly reviewFromBackend$: Observable<ReviewList> = this.reviewId$.pipe(
    switchMap(reviewId => this.communicationService.communicationReviewsRead(reviewId)),
  );

  public readonly professionalComment$: Observable<ReviewComment> = this.reviewId$.pipe(
    switchMap(reviewId =>
      this.accountsService.accountsReviewCommentsList({
        review: reviewId,
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
  public reviewCommentForm: FormGroup = this.fb.group({
    description: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
  });

  private reviewCommentSaveEndpoint: (data: ReviewComment) => Observable<ReviewComment>;
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private readonly accountsService: AccountsService,
    private readonly professionalsService: ProfessionalsService,
    private readonly communicationService: CommunicationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private readonly navCtrl: NavController,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  public sendReview(): void {
    this.reviewId$
      .pipe(
        switchMap(reviewId =>
          this.reviewCommentSaveEndpoint({
            ...this.reviewCommentForm.value,
            review: reviewId,
          }),
        ),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(() => {
        this.back();
      });
  }

  private back(): void {
    this.navCtrl.back();
  }

  private initForm(): void {
    this.professionalComment$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(comment => {
      this.reviewCommentSaveEndpoint = comment
        ? (data: ReviewComment) => this.accountsService.accountsReviewCommentsUpdate({ data, id: comment.id })
        : (data: ReviewComment) => this.accountsService.accountsReviewCommentsCreate(data);

      ['description'].forEach(field => {
        this.reviewCommentForm.get(field).setValue(comment?.[field] ?? null);
      });
      this.cd.markForCheck();
    });
  }
}
