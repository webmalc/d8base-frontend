import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {HelperService} from '@app/core/services/helper.service';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-location-tab',
    templateUrl: './location-tab.component.html',
    styleUrls: ['./location-tab.component.scss'],
})
export class LocationTabComponent implements OnInit {

    public masterId: number;
    public sizes: GridSizesInterface = {
        sizeXs: 12,
        sizeSm: 6,
        sizeMd: 6,
        sizeLg: 4,
        sizeXl: 3
    };

    constructor(
        public api: MasterLocationApiService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewItem(): ClientLocationInterface {
        return new MasterLocation();
    }

    public getPreparedMasterLocation(): (data: any) => ClientLocationInterface {
        return (data: any) => {
            const model = plainToClass(MasterLocation, data, {excludeExtraneousValues: true});
            model.professional = this.masterId;
            model.city = data.city?.id ?? undefined;
            model.country = data.country?.id ?? undefined;
            model.region = data.region?.id ?? undefined;
            model.subregion = data.subregion?.id ?? undefined;
            model.district = data.district?.id ?? undefined;
            model.timezone = data.timezone?.value ?? undefined;
            model.is_default = data.is_default?.value ?? undefined;

            return HelperService.clear<MasterLocation>(model);
        };
    }
}
