import {Component, OnInit} from '@angular/core';
import {CitiesApiService} from '@app/core/services/location/cities-api.service';
import {LocationService} from '@app/core/services/location/location.service';
import {City} from '@app/profile/models/city';
import {IonItem, PopoverController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-city-picker-popover',
    templateUrl: './city-picker-popover.component.html',
    styleUrls: ['./city-picker-popover.component.scss']
})
export class CityPickerPopoverComponent implements OnInit {

    public list$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);

    constructor(
        private readonly locationService: LocationService,
        private readonly citiesApi: CitiesApiService,
        private readonly pop: PopoverController
    ) {
    }

    public ngOnInit(): void {
        this.locationService.getMergedLocationData().then(
            location => {
                this.citiesApi.getByLocation(1000, location).subscribe(
                    cities => 0 === cities.results.length
                        ? this.pop.dismiss(null).catch(err => console.error(err))
                        : this.list$.next(cities.results)
                );
            }
        );
    }

    public onCitySelect(event: any): void {
        const item: IonItem = event.target;
        this.pop.dismiss(JSON.parse((item as any).getAttribute('city'))).catch(err => console.error(err));
    }

    public toStr(obj: object): string {
        return JSON.stringify(obj);
    }
}
