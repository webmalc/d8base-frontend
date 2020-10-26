import {Currency} from '@app/core/models/currency';

export interface StepTwoDataInterface {
    name: string;
    description: string;
    duration: number;
    is_price_fixed: boolean;
    price: number;
    price_currency: Currency;
    start_price_currency: Currency;
    end_price_currency: Currency;
    start_price: number;
    end_price: number;
    service_type: string;
}
