export interface IpDataInterface {
    postal_code: string;
    country_code: string;
    latitude: string | number;
    longitude: string | number;
    city: string;
    region_code?: string;
    timezone?: string;
}
