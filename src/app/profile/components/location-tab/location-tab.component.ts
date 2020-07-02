import {Component, Input} from '@angular/core';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {UserLocation} from '@app/core/models/user-location';
import {HelperService} from '@app/core/services/helper.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-location-tab',
    templateUrl: './location-tab.component.html',
    styleUrls: ['./location-tab.component.scss'],
})
export class LocationTabComponent {

    @Input() public gridSizes: GridSizesInterface = {
        sizeXs: 12,
        sizeSm: 6,
        sizeMd: 6,
        sizeLg: 4,
        sizeXl: 3
    };

    constructor(public api: UserLocationApiService) {
    }

    public getNewItem(): ClientLocationInterface {
        return new UserLocation();
    }

    public getPreparedUserLocation(): (data: any) => ClientLocationInterface {
        return (data: any) => {
            const model: UserLocation = plainToClass(UserLocation, data, {excludeExtraneousValues: true});
            model.city = data.city?.id ?? undefined;
            model.country = data.country?.id ?? undefined;
            model.region = data.region?.id ?? undefined;
            model.subregion = data.subregion?.id ?? undefined;
            model.district = data.district?.id ?? undefined;
            model.timezone = data.timezone?.value ?? undefined;

            return HelperService.clean<UserLocation>(model);
        };
    }
}
