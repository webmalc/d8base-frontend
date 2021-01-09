import { AbstractDatePeriodModel } from '@app/shared/models/abstract-date-period-model';
import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class Experience extends AbstractDatePeriodModel {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public title: string;
    @Expose() public company: string;
    @Expose() public is_still_here: boolean;
    @Expose() public description: string;
}
