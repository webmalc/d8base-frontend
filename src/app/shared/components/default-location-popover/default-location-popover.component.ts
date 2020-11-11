import {Component, OnInit} from '@angular/core';
import {DefaultLocation} from '@app/core/models/default-location';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-default-location-popover',
    templateUrl: './default-location-popover.component.html',
    styleUrls: ['./default-location-popover.component.scss']
})
export class DefaultLocationPopoverComponent implements OnInit {

    public locationData: DefaultLocation;
    public showPicker: boolean = false;
    public cityDisabled: boolean;

    constructor(
        private readonly navParams: NavParams,
        private readonly popoverController: PopoverController,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService
    ) {
    }

    public ngOnInit(): void {
        this.locationData = this.navParams.get<DefaultLocation>('data');
        this.cityDisabled = !(this.locationData.country && true);
    }

    public emit(): void {
        this.popoverController.dismiss(this.locationData);
    }

    public toggleMode(): void {
        this.showPicker = true;
    }

    public onCountryChange(): void {
        this.cityDisabled = false;
        this.locationData.city = undefined;
    }
}
