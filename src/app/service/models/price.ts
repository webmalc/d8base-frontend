import { Price as IPrice } from '@app/api/models';
import { Expose } from 'class-transformer';

export class Price implements IPrice {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public price: string;
    @Expose() public price_currency: string;
    @Expose() public start_price: string;
    @Expose() public start_price_currency: string;
    @Expose() public end_price: string;
    @Expose() public end_price_currency: string;
    @Expose() public is_price_fixed: boolean;
    @Expose() public payment_methods: Array<'cash' | 'online'> = [];
}
