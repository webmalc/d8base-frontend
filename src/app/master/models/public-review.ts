import {Review} from '@app/core/models/review';
import {PublicReviewComment} from '@app/master/models/public-review-comment';
import {Expose} from 'class-transformer';

export class PublicReview extends Review {
    @Expose() public comment: PublicReviewComment;
}
