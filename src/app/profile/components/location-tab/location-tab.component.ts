import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
export class LocationTabComponent implements OnInit {

    public userId: number;

    constructor(
        public api: UserLocationApiService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.userId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewUserLocation(): (data: any) => ClientLocationInterface {
        return (data: any) => {
            const model = plainToClass(UserLocation, data, {excludeExtraneousValues: true});
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
