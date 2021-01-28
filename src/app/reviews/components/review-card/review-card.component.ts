import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReviewList } from '@app/api/models';
import { HelperService } from '@app/core/services/helper.service';
import { ReviewsService } from '@app/reviews/services/reviews.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent implements OnChanges {
  @Input() public readonly review: ReviewList;
  @Input() public showComment: boolean = true;
  public isAbleToEditComment: Observable<boolean>;
  public readonly ratings: number[] = [1, 2, 3, 4, 5];
  public defaultAvatar = HelperService.getNoAvatarLink();
  public countryCode: Observable<string>;

  constructor(public readonly reviewsService: ReviewsService, private readonly cd: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.review) {
      if (this.review) {
        this.countryCode = this.reviewsService.getReviewCountryCodeByNationality(this.review.user.nationality);
        this.isAbleToEditComment = this.reviewsService.getIsInProfessionalIds(this.review.professional);
        this.cd.markForCheck();
      }
    }
  }
}
