import {Component, OnInit} from '@angular/core';
import {LocationService} from '@app/core/services/location/location.service';
import {City} from '@app/profile/models/city';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {IonItem} from '@ionic/angular';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

@Component({
    selector: 'app-city-picker-popover',
    templateUrl: './city-picker-popover.component.html',
    styleUrls: ['./city-picker-popover.component.scss'],
})
export class CityPickerPopoverComponent implements OnInit {

    public static city$: ReplaySubject<City> = new ReplaySubject<City>(1);
    public list$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);

    constructor(private locationService: LocationService, private citiesApi: CitiesApiService) {
    }

    public ngOnInit(): void {
        this.locationService.getMergedLocationData().then(
            location => {
                this.citiesApi.getByLocation(1000, location).subscribe(
                    cities => 0 === cities.results.length
                        ? CityPickerPopoverComponent.city$.next(null)
                        : this.list$.next(cities.results)
                );
            }
        );
    }

    public onCitySelect(event: any): void {
        const item: IonItem = event.target;
        CityPickerPopoverComponent.city$.next(
            JSON.parse((item as any).getAttribute('city'))
        );
    }

    public toStr(obj: object): string {
        return JSON.stringify(obj);
    }
}
