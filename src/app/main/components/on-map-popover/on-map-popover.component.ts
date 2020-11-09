import {Component, OnDestroy, OnInit} from '@angular/core';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coordinates} from '@app/shared/interfaces/coordinates';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {NavParams} from '@ionic/angular';
import {AsyncSubject, BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-on-map-popover',
    templateUrl: './on-map-popover.component.html',
    styleUrls: ['./on-map-popover.component.scss']
})
export class OnMapPopoverComponent implements OnInit, OnDestroy {

    public static result: AsyncSubject<{ coordinates: Coordinates, country: Country, city: City }>;
    public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public data: {
        coordinates: Coordinates,
        country: Country,
        city: City
    };

    constructor(
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        private readonly navParams: NavParams
    ) {
    }

    public ngOnDestroy(): void {
        this.emit();
    }

    public ngOnInit(): void {
        this.data = this.navParams.get<{ coordinates: Coordinates, country: Country, city: City }>('data');
        OnMapPopoverComponent.result = new AsyncSubject<{ coordinates: Coordinates; country: Country; city: City }>();
    }

    public onCordsChange(): void {
        this.emit();
    }

    public getCountryValue(): Country {
        return this.data?.country as Country;
    }

    public onCityChange(): void {
        this.emit();
    }

    public onCountryChange(): void {
        this.data.city = undefined;
        this.isCityEnabled$.next(true);
    }

    private emit(): void {
        OnMapPopoverComponent.result.next(this.data);
        OnMapPopoverComponent.result.complete();
    }
}
