import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Coordinates } from '@app/shared/interfaces/coordinates';
import { environment } from '@env/environment';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-location-map',
  templateUrl: './user-location-map.component.html',
  styleUrls: ['./user-location-map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserLocationMapComponent),
      multi: true,
    },
  ],
})
export class UserLocationMapComponent implements OnInit, ControlValueAccessor {
  public options: L.MapOptions;
  public clientCoordinates: number[];
  @Input() public interactive: boolean = true;
  private map: L.Map;
  private layerGroup: L.LayerGroup;
  private onChange: (fn: any) => void;
  private onTouch: (fn: any) => void;
  private readonly MAGIC_NUMBER = 200;

  public ngOnInit(): void {
    this.initMap(this.clientCoordinates);
  }

  public onMapReady(map: L.Map): void {
    this.map = map;
    this.layerGroup = L.layerGroup().addTo(this.map);
    if (this.clientCoordinates && this.clientCoordinates.length === 2) {
      new L.Marker({
        lat: this.clientCoordinates[1],
        lng: this.clientCoordinates[0],
      }).addTo(this.layerGroup);
    }
    this.invalidateSize();
  }

  public onMapClick(event: L.LeafletMouseEvent): void {
    if (!this.interactive) {
      return;
    }
    this.layerGroup.clearLayers();
    new L.Marker({ lat: event.latlng.lat, lng: event.latlng.lng }).bindPopup('your position').addTo(this.layerGroup);
    this.layerGroup.eachLayer((layer: L.Layer) => {
      const cords: number[] = [];
      cords[0] = ((layer as any)._latlng as L.LatLng).lng;
      cords[1] = ((layer as any)._latlng as L.LatLng).lat;
      this.onChange(this.getCoordinates(cords));
    });
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(data: number[]): void {
    this.clientCoordinates = data;
  }

    /* eslint-disable no-empty, @typescript-eslint/no-empty-function */
  public setDisabledState(isDisabled: boolean): void {}

  private invalidateSize(): void {
    setTimeout(() => this.map?.invalidateSize(true), this.MAGIC_NUMBER);
  }

  private initMap(coordinates: number[]): void {
    let center: L.LatLngLiteral = { lat: 46.550429, lng: -30.499274 };
    let zoom: number = 2;
    if (coordinates && coordinates.length === 2) {
      center = { lat: coordinates[1], lng: coordinates[0] };
      zoom = 12;
    }
    this.options = {
      layers: [L.tileLayer(environment.map_url, { maxZoom: 18, attribution: '...' })],
      zoom,
      center,
    };
  }

  private getCoordinates(coords: number[]): Coordinates {
    return {
      type: 'Point',
      coordinates: [coords[0], coords[1]],
    };
  }
}
