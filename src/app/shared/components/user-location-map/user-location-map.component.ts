import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Coordinates} from '@app/shared/interfaces/coordinates';
import * as L from 'leaflet';
import {LeafletMouseEvent} from 'leaflet';
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
export class UserLocationMapComponent implements OnInit, ControlValueAccessor, AfterViewInit {

    public options: L.MapOptions;
    @Input() public clientCoordinates: number[];
    @Input() public interactive: boolean = true;
    private map: L.Map;
    private layerGroup: L.LayerGroup;
    private onChange: (fn: any) => void;

    public ngAfterViewInit(): void {
        if (this.clientCoordinates) {
            setTimeout(() => this.onChange(this.getCoordinates(this.clientCoordinates)), 1000);
        }
    }

    public invalidateSize(): void {
        setTimeout(() => this.map.invalidateSize(true), 1000); // TODO: crutch TA DA
    }

    public ngOnInit(): void {
        this.initMap(this.clientCoordinates);
    }

    public onMapReady(map: L.Map): void {
        this.map = map;
        this.layerGroup = L.layerGroup().addTo(this.map);
        if (this.clientCoordinates) {
            (new L.Marker(
                {
                    lat: this.clientCoordinates[1],
                    lng: this.clientCoordinates[0]
                }
            )).addTo(this.layerGroup);
        }
    }

    public onMapClick(event: LeafletMouseEvent): void {
        if (!this.interactive) {
            return;
        }
        this.layerGroup.clearLayers();
        (new L.Marker({lat: event.latlng.lat, lng: event.latlng.lng})
            .bindPopup('your position'))
            .addTo(this.layerGroup);
        this.layerGroup.eachLayer(
            (layer: L.Layer) => {
                const cords: number[] = [];
                cords[0] = (((layer as any)._latlng) as L.LatLng).lng;
                cords[1] = (((layer as any)._latlng) as L.LatLng).lat;
                this.onChange(this.getCoordinates(cords));
            });
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

    private initMap(coordinates: number[]): void {
        let center: L.LatLngLiteral = {lat: 46.550429, lng: -30.499274};
        let zoom: number = 2;
        if (coordinates) {
            center = {lat: coordinates[1], lng: coordinates[0]};
            zoom = 12;
        }
        this.options = {
            layers: [L.tileLayer(environment.map_url, {maxZoom: 18, attribution: '...'})],
            zoom,
            center
        };
    }

    private getCoordinates(coords: number[]): Coordinates {
        return {
            type: 'Point',
            coordinates: [coords[0], coords[1]]
        };
    }
}
