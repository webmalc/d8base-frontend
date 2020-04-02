import {Expose} from 'class-transformer';

export class Country {
    @Expose() public id: number;
    @Expose() public slug: string;
    @Expose() public name: string;
    @Expose() public alt_names: number[];
    @Expose() public code: string;
    @Expose() public code3: string;
    @Expose() public population: number;
    @Expose() public area: number;
    @Expose() public currency: string;
    @Expose() public currency_name: string;
    @Expose() public currency_symb: string;
    @Expose() public language_codes: string;
    @Expose() public phone: string;
    @Expose() public continent: number;
    @Expose() public tld: string;
    @Expose() public postal_code_format: string;
    @Expose() public postal_code_regex: string;
    @Expose() public capital: string;
    @Expose() public neighbours: number[];
}
