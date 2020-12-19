import {PostalCode} from '@app/core/models/postal-code';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {ServiceTimetableInterface} from '@app/service/interfaces/service-timetable-interface';
import {StepSevenDepartureDataInterface} from '@app/service/interfaces/step-seven-departure-data-interface';

export interface StepSevenDataInterface extends ServiceTimetableInterface {
    country: Country;
    city: City;
    address?: string;
    postal_code?: PostalCode;
    payment_cash: boolean;
    payment_online: boolean;
    // departure?: StepSevenDepartureDataInterface;
    need_to_create_master_schedule: boolean;
    use_master_schedule: boolean;
    max_distance: number;
    units: string;
}
