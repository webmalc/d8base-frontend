/* eslint-disable */
export interface Price {
    created_by?: number;
    end_price?: null | string;
    end_price_currency?: string;
    id?: number;
    is_price_fixed: boolean;
    modified?: string;
    modified_by?: number;

    /**
     * available payment methods
     */
    payment_methods: Array<'cash' | 'online'>;
    price?: null | string;
    price_currency?: string;
    service: number;
    start_price?: null | string;
    start_price_currency?: string;
}
