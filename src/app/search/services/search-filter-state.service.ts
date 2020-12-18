import { Injectable } from '@angular/core';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';

@Injectable()
export class SearchFilterStateService {
    public data: SearchFilterStateInterface = this.getDefaultData();

    public setLocationData(data: SearchLocationDataInterface): void {
        this.data.main.location = data;
    }

    public clear(): void {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): SearchFilterStateInterface {
        return {
            main: {
                location: {
                    country: undefined,
                    city: undefined,
                    coordinates: undefined
                },
                radius: {
                    distance: undefined,
                    units: undefined
                },
                category: undefined,
                subcategory: undefined,
                tags: undefined,
                isOnlineBooking: undefined,
                isInstantBooking: undefined,
                datetime: {
                    from: undefined,
                    to: undefined
                },
                isOnlineService: undefined,
                isAtMasterLocationService: undefined,
                isAtClientLocationService: undefined,
                price: {
                    currency: undefined,
                    start: undefined,
                    end: undefined
                }
            },
            additional: undefined
        };
    }
}
