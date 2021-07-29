import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Service } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { LocationEditorPopoverComponent } from '@app/shared/components/location-editor-popover/location-editor-popover.component';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import LocationSelectorContext from './location-selector-context.interface';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
/**
 * Professional location selector
 */
export class LocationSelectorComponent {
  public context$: Observable<LocationSelectorContext>;
  @Output() public selectedLocationId = new EventEmitter<number>();
  private readonly service$ = new ReplaySubject<Service>(1);
  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(private readonly api: AccountsService, private readonly popoverController: PopoverController) {
    this.context$ = combineLatest([this.service$, this.refresh$]).pipe(
      switchMap(([service]) =>
        forkJoin({
          allLocations: api.accountsProfessionalLocationsList({
            professional: service.professional,
          }),
          initialLocations: api.accountsServiceLocationsList({
            service: service.id,
          }),
          service: of(service),
        }),
      ),
      map(data => ({
        service: data.service,
        professionalLocations: data.allLocations.results,
        initialLocation: data.initialLocations.results.filter(location => location.is_enabled)[0] ?? {
          max_distance: 0,
          service: data.service.id,
          location: data.allLocations.results[0]?.id,
        },
      })),
    );
  }

  @Input()
  public set service(service: Service) {
    this.service$.next(service);
    this.emitInitialValue();
  }

  public onChange(event: CustomEvent): void {
    this.selectedLocationId.emit(event.detail.value);
  }

  // TODO use shared service/state when working with locations
  public async addNewLocation(context: LocationSelectorContext): Promise<void> {
    const popover = await this.popoverController.create({
      component: LocationEditorPopoverComponent,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (!data) {
      return;
    }

    const newLocation = {
      ...data,
      professional: context.service.professional,
    };
    this.api.accountsProfessionalLocationsCreate(newLocation).subscribe(() => this.refresh$.next());
  }

  private emitInitialValue() {
    // selectedLocationId has to emit the initial value
    this.context$.pipe(take(1)).subscribe(context => this.selectedLocationId.emit(context.initialLocation.location));
  }
}
