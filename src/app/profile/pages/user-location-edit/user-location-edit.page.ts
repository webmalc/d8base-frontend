import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserLocation } from '@app/core/models/user-location';
import { LocationService } from '@app/core/services/location.service';
import { UserLocationApiService } from '@app/core/services/location/user-location-api.service';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { plainToClass } from 'class-transformer';

@Component({
    selector: 'app-user-location-edit',
    templateUrl: './user-location-edit.page.html',
    styleUrls: ['./user-location-edit.page.scss'],
})
export class UserLocationEditPage implements OnInit {

    public userLocation: UserLocation;
    private locationId: number;

    constructor(
        private readonly locationService: LocationService,
        private readonly location: Location,
        private readonly userLocationApi: UserLocationApiService,
        private readonly route: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.locationId = parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
        if (this.locationId) {
            this.locationService.getSingle<UserLocation>(this.userLocationApi, this.locationId).subscribe(
                location => this.userLocation = location,
            );
        } else {
            this.userLocation = new UserLocation();
        }
    }

    public transform(data: ClientLocationInterface): ClientLocationInterface {
        return plainToClass(UserLocation, data);
    }

    public save(item: ClientLocationInterface): void {
        this.locationId ?
            this.userLocationApi.patch(item as UserLocation).subscribe(() => this.location.back()) :
            this.userLocationApi.create(item as UserLocation).subscribe(() => this.location.back());
    }

    public delete(item: ClientLocationInterface): void {
        this.userLocationApi.delete(item as UserLocation).subscribe(() => this.location.back());
    }
}
