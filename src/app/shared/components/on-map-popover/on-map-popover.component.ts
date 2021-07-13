import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgDestroyService } from '@app/core/services/ng-destroy.service';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import * as Geo from '@app/core/functions/geo.functions';
import { NavParams, PopoverController } from '@ionic/angular';
import { merge } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-on-map-popover',
  templateUrl: './on-map-popover.component.html',
  styleUrls: ['./on-map-popover.component.scss'],
  providers: [NgDestroyService],
})
export class OnMapPopoverComponent implements OnInit {
  public city = this.fb.control(null);
  public country = this.fb.control(null);
  public coordinates = this.fb.control(null);

  public data: SearchLocationDataInterface;

  constructor(
    private readonly navParams: NavParams,
    private readonly popover: PopoverController,
    private readonly fb: FormBuilder,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.initData();
    this.subscribeControlChanges();
  }

  private subscribeControlChanges(): void {
    merge(this.city.valueChanges.pipe(filter(city => Boolean(city))), this.coordinates.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => {
        const returnData: SearchLocationDataInterface = {
          city: this.city.value,
          country: this.country.value,
          coordinates: Geo.convertCoordsFromMap(this.coordinates.value?.coordinates),
        };

        await this.popover.dismiss(returnData);
      });
  }

  private initData(): void {
    const data = this.navParams.get<SearchLocationDataInterface>('data');
    this.country.setValue(data?.country, { emitEvent: false });
    this.city.setValue(data?.city, { emitEvent: false });
    this.coordinates.setValue(Geo.convertCoordsToMap(data?.coordinates), { emitEvent: false });
  }
}
