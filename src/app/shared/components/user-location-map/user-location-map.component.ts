import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {Coordinates} from '@app/shared/interfaces/coordinates';
import * as L from 'leaflet';
import {LeafletMouseEvent} from 'leaflet';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-user-location-map',
    templateUrl: './user-location-map.component.html',
    styleUrls: ['./user-location-map.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UserLocationMapComponent),
        multi: true
    }]
})
export class UserLocationMapComponent implements OnInit, ControlValueAccessor {

    public options: L.MapOptions;
    @Input() public clientLocationList: BehaviorSubject<ClientLocationInterface[]>;
    private map: L.Map;
    private layerGroup: L.LayerGroup;
    private onChange: (fn: any) => void;

    public ngOnInit(): void {
        this.clientLocationList.subscribe(
            cords => cords.length ? this.initMap(cords[0].coordinates.coordinates) : null
        );
    }

    public onMapReady(map: L.Map): void {
        this.map = map;
        this.layerGroup = L.layerGroup().addTo(this.map);
        this.clientLocationList.subscribe((data: ClientLocationInterface[]) =>
            (new L.Marker({lat: data[0].coordinates.coordinates[1], lng: data[0].coordinates.coordinates[0]}))
                .addTo(this.layerGroup));
    }

    public onMapClick(event: LeafletMouseEvent): void {
        this.layerGroup.clearLayers();
        (new L.Marker({lat: event.latlng.lat, lng: event.latlng.lng})
            .bindPopup('your position'))
            .addTo(this.layerGroup);
        this.layerGroup.eachLayer(
            (layer: L.Layer) => this.onChange(this.getCoordinates((layer as any)._latlng))
        );
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // tslint:disable:no-empty
    public registerOnTouched(fn: any): void {}

    public writeValue(data: string[]): void {}

    public setDisabledState(isDisabled: boolean): void {}

    private initMap(coordinates: number[]): void {
        this.options = {
            layers: [
                L.tileLayer(environment.map_url, { maxZoom: 18, attribution: '...' })
            ],
            zoom: 12,
            center: L.latLng(coordinates[1], coordinates[0])
        };
    }

    private getCoordinates(coords: L.LatLng): Coordinates {
        return {
            type: 'Point',
            coordinates: [coords.lng, coords.lat]
        };
    }
}
