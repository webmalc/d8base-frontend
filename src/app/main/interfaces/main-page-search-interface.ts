import {SearchLocationDataInterface} from '@app/main/interfaces/search-location-data-interface';

export interface MainPageSearchInterface {
    needle: string;
    date: string;
    time: string;
    location: SearchLocationDataInterface;
}
