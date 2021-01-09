import {Component, Input} from '@angular/core';
import {ProfessionalLocationInline} from '@app/api/models/professional-location-inline';
import {FullLocationService, LocationInterface} from '@app/core/services/location/full-location.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-location-viewer',
    templateUrl: './location-viewer.component.html',
    styleUrls: ['./location-viewer.component.scss'],
})
export class LocationViewerComponent {
    public locationText$: Observable<string>;

    private readonly locationSubject = new BehaviorSubject<ProfessionalLocationInline>(null);

    constructor(private readonly locationService: FullLocationService) {
        this.locationText$ = this.locationSubject.pipe(
            switchMap(location => location ? locationService.getTextLocation(location) : of(null)),
            map(result => result?.text),
        );
    }

    @Input()
    public set location(value: LocationInterface) {
        this.locationSubject.next(value);
    }
}
