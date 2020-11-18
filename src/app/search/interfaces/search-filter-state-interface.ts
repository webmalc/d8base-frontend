import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {SearchLocationDataInterface} from '@app/main/interfaces/search-location-data-interface';
import {Tag} from '@app/master/models/tag';

export interface SearchFilterStateInterface {
    main: {
        location: SearchLocationDataInterface,
        radius: {
            distance: number,
            units: boolean
        },
        category: Category[],
        subcategory: Subcategory[],
        tags: Tag[],
        isOnlineBooking: boolean,
        isInstantBooking: boolean,
        datetime: {},
        isOnlineService: boolean,
        isAtMasterLocationService: boolean,
        isAtClientLocationService: boolean,
        price: {}
    };
    additional: {};
}
