import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
export class ReviewCardComponent {
  @Input()
  public get review(): ReviewList {
    return this._review;
  }
  public set review(review: ReviewList) {
    this._review = review;
    if (review) {
      this.countryCode = this.reviewsService.getReviewCountryCodeByNationality(this.review.user.nationality);
      this.isAbleToEditComment = this.reviewsService.getIsInProfessionalIds(this.review.professional);
    }
  }

  @Input() public showComment: boolean = true;
  public isAbleToEditComment: Observable<boolean>;
  public readonly ratings: number[] = [1, 2, 3, 4, 5];
  public defaultAvatar = HelperService.getNoAvatarLink();
  public countryCode: Observable<string>;
  private _review: ReviewList;

  constructor(public readonly reviewsService: ReviewsService) {}
}
