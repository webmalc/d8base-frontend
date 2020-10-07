import {HelperService} from '@app/core/services/helper.service';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class AbstractDatePeriodModel {
    @Expose() public start_date: string;
    @Expose() public end_date: string;

    public formatDates(): void {
        this.start_date = HelperService.fromDatetime(this.start_date).date;
        this.end_date = HelperService.fromDatetime(this.end_date).date;
    }
}
