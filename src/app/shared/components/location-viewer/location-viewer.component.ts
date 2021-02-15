import { Component, Input } from '@angular/core';
import { FullLocationService, LocationInterface } from '@app/core/services/location/full-location.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

const DEFAULT_FLAG = 'ca';

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss'],
})
export class LocationViewerComponent {

  @Input() public type: 'full' | 'short' | 'flag' = 'full';

  public locationText$: Observable<string>;
  public countryCode$: Observable<string>;
  public pending$ = new BehaviorSubject(false);

  private readonly locationSubject = new BehaviorSubject<LocationInterface>(null);

  constructor(private readonly locationService: FullLocationService) {
    this.countryCode$ = this.locationSubject.pipe(
      switchMap(location => this.locationService.getCountryCode(location)),
      map(code => code?.toLowerCase() ?? DEFAULT_FLAG),
    );

    this.locationText$ = this.locationSubject.pipe(
      switchMap(location => {
        this.pending$.next(true);
        return locationService.getTextLocation(location, this.type === 'short').pipe(
          finalize(() => this.pending$.next(false)),
        );
      }),
      map(result => result?.text),
    );
  }

  @Input()
  public set location(value: LocationInterface) {
    this.locationSubject.next(value);
  }
}
