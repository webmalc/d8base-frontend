import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {ServiceTimetableInterface} from '@app/service/interfaces/service-timetable-interface';

export interface StepSevenDataInterface {
    serviceTimetable: ServiceTimetableInterface;
    country: Country;
    city: City;
    address: string;
    postal_code: number;
    payment_cash: boolean;
    payment_online: boolean;
    departure: {
        not_within_the_city: boolean;
        max_distance: number;
    };
}
