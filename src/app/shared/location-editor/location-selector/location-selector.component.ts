import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AccountsService } from '@app/api/services/accounts.service';
import { LocationEditorPopoverComponent } from '@app/shared/location-editor/location-editor-popover/location-editor-popover.component';
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
export class LocationSelectorComponent implements OnInit {
  public context$: Observable<LocationSelectorContext>;
  @Output() public selectedLocationId = new EventEmitter<number>();
  private readonly serviceId$ = new BehaviorSubject<number>(NaN);
  private readonly professionalId$ = new ReplaySubject<number>(NaN);
  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(private readonly api: AccountsService, private readonly popoverController: PopoverController) {
    this.context$ = combineLatest([this.professionalId$, this.serviceId$, this.refresh$]).pipe(
      switchMap(([professionalId, serviceId]) =>
        forkJoin({
          allLocations: api.accountsProfessionalLocationsList({
            professional: professionalId,
          }),
          initialLocations: serviceId
            ? api.accountsServiceLocationsList({
                service: serviceId,
              })
            : of({ results: [] }),
          serviceId: of(serviceId),
          professionalId: of(professionalId),
        }),
      ),
      map(data => ({
        professionalLocations: data.allLocations.results,
        initialLocation: data.initialLocations.results.filter(location => location.is_enabled)[0] ?? {
          max_distance: 0,
          service: data.serviceId,
          location: data.allLocations.results[0]?.id,
        },
        professionalId: data.professionalId,
      })),
    );
  }

  @Input()
  public set serviceId(id: number) {
    this.serviceId$.next(id);
  }

  /**
   * Required value
   */
  @Input()
  public set professionalId(id: number) {
    this.professionalId$.next(id);
  }

  public ngOnInit(): void {
    this.context$.pipe(take(1)).subscribe(context => this.selectedLocationId.emit(context.initialLocation.location));
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
      professional: context.professionalId,
    };
    this.api.accountsProfessionalLocationsCreate(newLocation).subscribe(() => this.refresh$.next());
  }
}
