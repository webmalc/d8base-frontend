export interface LocationInterface {
    postalCode: string;
    countryCode: string;
    latitude: string | number;
    longitude: string | number;
    city: string;
    regionCode?: string;
    timezone?: string;
}
