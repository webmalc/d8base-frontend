import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {Tag} from '@app/master/models/tag';

export interface IssuanceFilterStateInterface {
    main: {
        address: string,
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
