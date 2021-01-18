import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { SentOrder } from '@app/api/models/sent-order';
import { ProfessionalsService, ServicesService } from '@app/api/services';
import { AccountsService } from '@app/api/services/accounts.service';
import { HelperService } from '@app/core/services/helper.service';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnInit {
  public service: ServiceList;
  public professional: ProfessionalList;
  public reviewsCount: number;
  public readonly rates: number[] = [1, 2, 3, 4, 5];
  public selectedRate: number;
  public defaultAvatar = HelperService.getNoAvatarLink();
  public reviewForm: FormGroup = this.fb.group({
    description: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    rating: [null, Validators.required],
  });
  private order: SentOrder;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly servicesService: ServicesService,
    private readonly professionalsService: ProfessionalsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.getProfessionalInfo();
  }

  public declineReviews(num: number): string {
    return HelperService.declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }

  public sendReview(): void {
    this.accountsService
      .accountsReviewsCreate({
        ...this.reviewForm.value,
        professional: this.professional.id,
      })
      .subscribe(val => {
        this.location.back();
      });
  }

  private getProfessionalInfo(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ orderId }) =>
          this.accountsService
            .accountsOrdersSentRead(orderId)
            .pipe(
              switchMap(order =>
                this.servicesService
                  .servicesServicesRead(order.service)
                  .pipe(
                    switchMap(service =>
                      forkJoin([
                        this.professionalsService.professionalsProfessionalsRead(service.professional),
                        this.accountsService.accountsReviewsList({ professional: `${service.professional}`, pageSize: 1 }),
                      ]).pipe(map(([professional, reviews]) => ({ order, service, professional, reviewsCount: reviews.count }))),
                    ),
                  ),
              ),
            ),
        ),
      )
      .subscribe(({ order, service, professional, reviewsCount }) => {
        this.order = order;
        this.service = service;
        this.professional = professional;
        this.reviewsCount = reviewsCount;
      });
  }
}
