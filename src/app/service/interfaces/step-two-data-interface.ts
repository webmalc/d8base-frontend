export interface StepTwoDataInterface {
    name: string;
    description: string;
    duration_hours: number;
    duration_minutes: number;
    is_price_fixed: boolean;
    price: number;
    price_currency: {value: string; display_name: string};
    start_price_currency: {value: string; display_name: string};
    end_price_currency: {value: string; display_name: string};
    start_price: number;
    end_price: number;
    service_type: string;
}
