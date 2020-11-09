import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LocationService} from '@app/core/services/location/location.service';
import {OnMapPopoverComponent} from '@app/main/components/on-map-popover/on-map-popover.component';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coordinates} from '@app/shared/interfaces/coordinates';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-location-picker',
    templateUrl: './location-picker.component.html',
    styleUrls: ['./location-picker.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => LocationPickerComponent),
        multi: true
    }]
})
export class LocationPickerComponent implements ControlValueAccessor {

    private onChange: (fn: any) => void;
    private locationData: {
        coordinates: Coordinates,
        country: Country,
        city: City
    } = {
        coordinates: {
            type: undefined,
            coordinates: []
        },
        country: undefined,
        city: undefined
    };

    constructor(private readonly location: LocationService, private readonly pop: PopoverController) {
    }

    public initPopover(): void {
        this.pop.create({
            component: OnMapPopoverComponent,
            translucent: true,
            animated: true,
            componentProps: {data: this.locationData},
            cssClass: ['map-popover-width', 'map-popover-height']
        }).then(pop => pop.present().then(
            () => {
                OnMapPopoverComponent.result.subscribe(
                    data => {
                        this.locationData = data;
                        this.onChange(data);
                        this.pop.dismiss();
                    }
                );
            }
        ));
    }

    public getLocationString(): string | null {
        if (!this.locationData) {
            return null;
        }
        if (this.locationData.country && this.locationData.city) {
            return `${this.locationData.country.name}, ${this.locationData.city.name}`;
        }
        if (this.locationData.country) {
            return this.locationData.country.name;
        }
        if (this.locationData.city) {
            return this.locationData.city.name;
        }
        if (this.locationData.coordinates.coordinates.length === 2) {
            return `${this.locationData.coordinates.coordinates[1]} ${this.locationData.coordinates.coordinates[0]}`;
        }

        return null;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // tslint:disable:no-empty
    public registerOnTouched(fn: any): void {
    }

    public writeValue(data: string[]): void {
    }

    public setDisabledState(isDisabled: boolean): void {
    }
}
