import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

    constructor(
        public api: MasterLocationApiService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewMasterLocation(): (data: any) => ClientLocationInterface {
        return (data: any) => {
            const model = plainToClass(MasterLocation, data, {excludeExtraneousValues: true});
            model.professional = this.masterId;
            model.city = data.city?.id ?? undefined;
            model.country = data.country?.id ?? undefined;
            model.region = data.region?.id ?? undefined;
            model.subregion = data.subregion?.id ?? undefined;
            model.district = data.district?.id ?? undefined;
            model.timezone = data.timezone?.value ?? undefined;
            this.clean(model);

            return model;
        };
    }

    private clean(obj: object): void {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }
}
