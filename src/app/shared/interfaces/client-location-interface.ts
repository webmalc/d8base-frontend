export interface ClientLocationInterface {
    id?: number;
    country?: number;
    region?: number;
    subregion?: number;
    city: number;
    district: number;
    postal_code: number;
    address: string;
    coordinates: {
        type: string,
        coordinates: number[]
    };
    units: number;
    professional?: number;
    timezone: string;
}
