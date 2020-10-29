import {Injectable} from '@angular/core';
import {IssuanceFilterStateInterface} from '@app/issuance/interfaces/issuance-filter-state-interface';

@Injectable()
export class IssuanceFilterStateService {

    public data: IssuanceFilterStateInterface = this.getDefaultData();

    public clear(): void {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): IssuanceFilterStateInterface {
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
