import {Expose} from 'class-transformer';

export class PublicReviewComment {
    @Expose() public id: number;
    @Expose() public title: string;
    @Expose() public description: string;
    @Expose() public created: string;
}
