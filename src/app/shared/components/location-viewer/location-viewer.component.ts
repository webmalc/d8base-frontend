import { Component, Input } from '@angular/core';
import { LocationResolverService, LocationInterface } from '@app/core/services/location/location-resolver.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss'],
})
export class LocationViewerComponent {
  @Input() public type: 'full' | 'short' = 'full';

  public locationText$: Observable<string>;
  public pending$: Observable<boolean>;

  private readonly locationSubject = new BehaviorSubject<LocationInterface>(null);

  constructor(private readonly locationService: LocationResolverService) {
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
