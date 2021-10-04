import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-on-map-popover',
  templateUrl: './on-map-popover.component.html',
  styleUrls: ['./on-map-popover.component.scss'],
})
export class OnMapPopoverComponent {
  public city: FormControl;
  public country: FormControl;

  public data: ResolvedUserLocation;

  constructor(
    private readonly navParams: NavParams,
    private readonly popover: PopoverController,
    private readonly fb: FormBuilder,
  ) {
    const data = this.navParams.get<ResolvedUserLocation>('data');
    this.city = this.fb.control(data?.city);
    this.country = this.fb.control(data?.country);
  }

  public async submit(): Promise<void> {
    const returnData: ResolvedUserLocation = {
      city: this.city.value,
      country: this.country.value,
    };

    await this.popover.dismiss(returnData);
  }

  public async dismiss(): Promise<void> {
    await this.popover.dismiss();
  }
}
