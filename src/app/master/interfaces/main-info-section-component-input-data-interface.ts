import {Review} from '@app/core/models/review';

export interface MainInfoSectionComponentInputDataInterface {
    fullName: string;
    company: string;
    avatar: string;
    rating: string;
    reviews: Review[];
    is_confirmed: boolean;
}
