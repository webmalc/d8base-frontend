import { HelperService } from '@app/core/services/helper.service';
import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class AbstractDatePeriodModel {
  @Expose() public start_date: string;
  @Expose() public end_date: string;

  public formatDates(): void {
    if (this.start_date) {
      this.start_date = HelperService.fromDatetime(this.start_date).date;
    }
    if (this.end_date) {
      this.end_date = HelperService.fromDatetime(this.end_date).date;
    }
  }
}
