import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalList, ProfessionalLocation, UserLocation } from '@app/api/models';
import { NavParams, NavPath } from '@app/core/constants/navigation.constants';
import { toNumber } from '@app/core/functions/string.functions';
import { NgDestroyService } from '@app/core/services';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import * as ProfessionalLocationActions from '@app/store/professional-page/professional-locations/professional-locations.actions';
import ProfessionalLocationSelectors from '@app/store/professional-page/professional-locations/professional-locations.selectors';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-location-edit',
  templateUrl: './master-location-edit.page.html',
  styleUrls: ['./master-location-edit.page.scss'],
  providers: [NgDestroyService],
})
export class MasterLocationEditPage implements OnInit {
  @Select(ProfessionalPageSelectors.professional)
  public professional$: Observable<ProfessionalList>;

  @Select(ProfessionalLocationSelectors.locations)
  public locations$: Observable<ProfessionalLocation[]>;

  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  public location$: Observable<ProfessionalLocation>;

  private readonly locationId$: Observable<number> = this.route.params.pipe(
    map(params => toNumber(params[NavParams.LocationId])),
  );

  // codebeat:disable[ARITY]
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly destroy$: NgDestroyService,
    private readonly actions$: Actions,
  ) {}

  public ngOnInit(): void {
    this.location$ = this.locationId$.pipe(
      switchMap(locationId => (!locationId ? this.getEmptyLocation() : this.getLocation(locationId))),
    );

    this.subscribeToActionSuccess();
  }

  public save(location: ProfessionalLocation): void {
    if (location.id) {
      this.store.dispatch(new ProfessionalLocationActions.UpdateProfessionalLocation(location));
    } else {
      this.store.dispatch(new ProfessionalLocationActions.CreateProfessionalLocation(location));
    }
  }

  public delete(id: ProfessionalLocation['id']): void {
    this.store.dispatch(new ProfessionalLocationActions.DeleteProfessionalLocation(id));
  }

  private subscribeToActionSuccess(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(
          ProfessionalLocationActions.CreateProfessionalLocation,
          ProfessionalLocationActions.DeleteProfessionalLocation,
          ProfessionalLocationActions.UpdateProfessionalLocation,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate([NavPath.Professional]);
      });
  }

  private getLocation(locationId): Observable<ProfessionalLocation> {
    return this.locations$.pipe(map(locations => locations?.find(({ id }) => locationId === id)));
  }

  private getEmptyLocation(): Observable<ProfessionalLocation> {
    return combineLatest([this.defaultLocation$, this.professional$]).pipe(
      map(([defaultLocation, professional]) => ({
        professional: professional?.id,
        country: defaultLocation?.country,
        region: defaultLocation?.region,
        subregion: defaultLocation?.subregion,
        city: defaultLocation?.city,
      })),
    );
  }
}
