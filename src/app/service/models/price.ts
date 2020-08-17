import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class Price {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public price: number;
    @Expose() public price_currency: string;
    @Expose() public start_price: number;
    @Expose() public start_price_currency: string;
    @Expose() public end_price: number;
    @Expose() public end_price_currency: string;
    @Expose() public is_price_fixed: boolean;
    @Expose() public payment_methods: string[] = [];
}
