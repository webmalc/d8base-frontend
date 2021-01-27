import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Service, ServiceLocation } from '@app/api/models';
import { ServiceType } from '@app/core/types/service-types';
import { UserSettingsService } from '@app/shared/services/user-settings.service';

@Component({
  selector: 'app-service-location-editor',
  templateUrl: './service-location-editor.component.html',
  styleUrls: ['./service-location-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServiceLocationEditorComponent),
      multi: true,
    },
  ],
})
export class ServiceLocationEditorComponent implements ControlValueAccessor {

  @Input() public type: ServiceType;

  @Input() public service: Service;

  private onChange: (value: ServiceLocation) => void;
  private onTouched: () => void;
  private locationId: number;
  private maxDistance: number;

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: ServiceLocation): void {
    // gets its value from the service
  }

  public selectLocationId(id: number): void {
    this.locationId = id;
    this.update();
  }

  public enterDistance(event: CustomEvent): void {
    this.maxDistance = event.detail.value;
    this.update();
  }

  private update() {
    if (!this.onChange) {
      return;
    }
    this.onChange({
      location: this.locationId,
      service: this.service.id,
      max_distance: this.maxDistance,
    });
  }
}
