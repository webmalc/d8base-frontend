import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { OnMapPopoverComponent } from '@app/shared/components/on-map-popover/on-map-popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent {
  @Input() public enabled: boolean = false;
  @Input() public locationData: ResolvedUserLocation;
  @Output() public emitter: EventEmitter<ResolvedUserLocation> = new EventEmitter<ResolvedUserLocation>();

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
          country: this.locationData?.country,
          city: this.locationData?.city,
        },
      },
      cssClass: ['map-popover-width'],
    });
    pop.onDidDismiss().then((data: { data: ResolvedUserLocation }) => {
      if (data.data) {
        if (data.data?.city?.id !== this.locationData?.city?.id) {
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
