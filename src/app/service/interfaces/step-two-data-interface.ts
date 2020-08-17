import {Currency} from '@app/core/models/currency';

export interface StepTwoDataInterface {
    name: string;
    description: string;
    duration_first_name: string;
    duration_second_name: string;
    duration_first: number;
    duration_second: number;
    is_price_fixed: boolean;
    price: number;
    price_currency: Currency;
    start_price_currency: Currency;
    end_price_currency: Currency;
    start_price: number;
    end_price: number;
    service_type: string;
}
