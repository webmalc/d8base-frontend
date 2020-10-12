import {PublicReview} from '@app/master/models/public-review';

export interface MainInfoSectionComponentInputDataInterface {
    fullName: string;
    company: string;
    avatar: string;
    rating: string;
    reviews: PublicReview[];
    is_confirmed: boolean;
}
