import {Injectable} from '@angular/core';
import {SearchFilterStateInterface} from '@app/search/interfaces/search-filter-state-interface';

@Injectable()
export class SearchFilterStateService {

    public data: SearchFilterStateInterface = this.getDefaultData();

    public clear(): void {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): SearchFilterStateInterface {
        return {
            main: {
                address: undefined,
                radius: {
                    distance: undefined,
                    units: undefined
                },
                category: undefined,
                subcategory: undefined,
                tags: undefined,
                isOnlineBooking: undefined,
                isInstantBooking: undefined,
                datetime: undefined,
                isOnlineService: undefined,
                isAtMasterLocationService: undefined,
                isAtClientLocationService: undefined,
                price: undefined
            },
            additional: undefined
        };
    }
}
