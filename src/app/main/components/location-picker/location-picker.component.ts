import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent {
  @Input() public enabled: boolean = false;
  @Input() public locationData: SearchLocationDataInterface;
  @Output() public emitter: EventEmitter<SearchLocationDataInterface> = new EventEmitter<SearchLocationDataInterface>();

  constructor(private readonly pop: PopoverController) {}

  public async initPopover(): Promise<void> {
    if (!this.enabled) {
      return;
    }
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          coordinates: this.locationData?.coordinates,
          country: this.locationData?.country,
          city: this.locationData?.city,
        },
      },
      cssClass: ['map-popover-width'],
    });
    pop.onDidDismiss().then((data: { data: SearchLocationDataInterface }) => {
      if (data.data) {
        if (data.data?.city?.id !== this.locationData?.city?.id) {
          data.data.coordinates = undefined;
          this.emitter.emit(data.data);
        } else if (
          data.data?.coordinates?.longitude !== this.locationData?.coordinates?.longitude ||
          data.data?.coordinates?.latitude !== this.locationData?.coordinates?.latitude
        ) {
          data.data.country = undefined;
          data.data.city = undefined;
          this.emitter.emit(data.data);
        }
      }
    });

    return await pop.present();
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

    return null;
  }
}
