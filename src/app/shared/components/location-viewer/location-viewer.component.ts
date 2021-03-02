import { Component, Input } from '@angular/core';
import { FullLocationService, LocationInterface } from '@app/core/services/location/full-location.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

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
  public pending$: Observable<boolean>;

  private readonly locationSubject = new BehaviorSubject<LocationInterface>(null);

  constructor(private readonly locationService: FullLocationService) {
    this.countryCode$ = this.locationSubject.pipe(
      switchMap(location => this.locationService.getCountryCode(location)),
      map(code => code?.toLowerCase() ?? DEFAULT_FLAG),
    );

    this.locationText$ = this.locationSubject.pipe(
      switchMap(location => locationService.getTextLocation(location, this.type === 'short')),
      map(result => result?.text),
      startWith(null),
    );

    this.pending$ = combineLatest([this.locationSubject, this.locationText$]).pipe(
      map(([location, text]) => location && text === null),
    );
  }

  @Input()
  public set location(value: LocationInterface) {
    this.locationSubject.next(value);
  }
}
