import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '@app/core/services/location.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {plainToClass} from 'class-transformer';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-master-location-edit',
    templateUrl: './master-location-edit.page.html',
    styleUrls: ['./master-location-edit.page.scss']
})
export class MasterLocationEditPage implements OnInit {

    public masterLocation: MasterLocation;
    private locationId: number;

    constructor(
        private readonly locationService: LocationService,
        private readonly location: Location,
        private readonly masterLocationApi: MasterLocationApiService,
        private readonly route: ActivatedRoute,
        private readonly masterManager: MasterManagerService
    ) {
    }

    public ngOnInit(): void {
        this.locationId = parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
        if (this.locationId) {
            this.locationService.getSingle<MasterLocation>(this.masterLocationApi, this.locationId).subscribe(
                location => this.masterLocation = location
            );
        } else {
            this.masterLocation = new MasterLocation();
        }
    }

    public transform(data: ClientLocationInterface): ClientLocationInterface {
        return plainToClass(MasterLocation, data);
    }

    public save(item: ClientLocationInterface): void {
        this.locationId ?
            this.masterLocationApi.patch(item as MasterLocation).subscribe(() => this.location.back()) :
            this.masterManager.getMasterList().pipe(
                switchMap(list => {
                    item.professional = list[0].id;

                    return this.masterLocationApi.create(item as MasterLocation);
                })
            ).subscribe(() => this.location.back());
    }

    public delete(item: ClientLocationInterface): void {
        this.masterLocationApi.delete(item as MasterLocation).subscribe(() => this.location.back());
    }
}
