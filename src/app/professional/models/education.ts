import { AbstractDatePeriodModel } from '@app/shared/models/abstract-date-period-model';
import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class Education extends AbstractDatePeriodModel {
  @Expose() public id: number;
  @Expose() public professional: number;
  @Expose() public university: string;
  @Expose() public deegree?: string;
  @Expose() public field_of_study?: string;
  @Expose() public is_still_here?: boolean;
  @Expose() public description?: string;
}
