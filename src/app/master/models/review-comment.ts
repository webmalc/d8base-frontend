import {PublicReviewComment} from '@app/master/models/public-review-comment';
import {Expose} from 'class-transformer';

export class ReviewComment extends PublicReviewComment {
    @Expose() public review: number;
}
