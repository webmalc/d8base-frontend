import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { City, Country } from '@app/api/models';
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
  @Input() public disabled: boolean = false;
  @Input() public country: Country;
  @Input() public city: City;
  @Output() public emitter: EventEmitter<ResolvedUserLocation> = new EventEmitter<ResolvedUserLocation>();

  constructor(private readonly pop: PopoverController) {}

  public async initPopover(): Promise<void> {
    if (this.disabled) {
      return;
    }
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          country: this.country,
          city: this.city,
        },
      },
      cssClass: ['map-popover-width'],
    });
    pop.onDidDismiss().then((data: { data: ResolvedUserLocation }) => {
      if (data.data) {
        this.country = data.data.country;
        this.city = data.data.city;
        this.emitter.emit(data.data);
      }
    });

    return await pop.present();
  }

  public getLocationString(): string | null {
    if (!(this.country || this.city)) {
      return null;
    }
    if (this.country && this.city) {
      return `${this.country.name}, ${this.city.name}`;
    }
    if (this.country) {
      return this.country.name;
    }
    if (this.city) {
      return this.city.name;
    }

    return null;
  }
}
