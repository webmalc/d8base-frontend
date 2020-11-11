export interface NominatimReverseResponseInterface {
    'place_id': number;
    'licence': string;
    'osm_type': string;
    'osm_id': number;
    'lat': string;
    'lon': string;
    'place_rank': number;
    'category': string;
    'type': string;
    'importance': number;
    'addresstype': string;
    'name': string;
    'display_name': string;
    'address': {
        'historic': string;
        'road': string;
        'neighbourhood': string;
        'suburb': string;
        'city'?: string;
        'town'?: string;
        'municipality': string;
        'county': string;
        'state': string;
        'country': string;
        'postcode': string;
        'country_code': string
    };
    'boundingbox': number[];
}
