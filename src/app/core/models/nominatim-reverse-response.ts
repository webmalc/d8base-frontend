import {NominatimReverseResponseInterface} from '@app/core/interfaces/nominatim-reverse-response-interface';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class NominatimReverseResponse implements NominatimReverseResponseInterface {
    @Expose() public error?: string;
    @Expose() public place_id: number;
    @Expose() public licence: string;
    @Expose() public osm_type: string;
    @Expose() public osm_id: number;
    @Expose() public lat: string;
    @Expose() public lon: string;
    @Expose() public place_rank: number;
    @Expose() public category: string;
    @Expose() public type: string;
    @Expose() public importance: number;
    @Expose() public addresstype: string;
    @Expose() public name: string;
    @Expose() public display_name: string;
    @Expose() public address: {
        historic: string;
        road: string;
        neighbourhood: string;
        suburb: string;
        city?: string;
        town?: string;
        village?: string;
        municipality: string;
        county: string;
        state: string;
        country: string;
        postcode: string;
        country_code: string
    };
    @Expose() public boundingbox: number[];

    public getCityName(): string | null {
        return this.address.city ?? this.address.town ?? this.address.village ?? null;
    }
}
