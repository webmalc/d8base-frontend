import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as UserLocationActions from '@app/store/current-user/user-locations/user-locations.actions';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-user-location-edit',
  templateUrl: './user-location-edit.page.html',
  styleUrls: ['./user-location-edit.page.scss'],
  providers: [NgDestroyService],
})
export class UserLocationEditPage implements OnInit {
  @Select(UserLocationSelectors.locations)
  public locations$: Observable<UserLocation[]>;

  public location$: Observable<UserLocation>;

  private readonly locationId$: Observable<number> = this.route.params.pipe(
    map(params => parseInt(params['location-id'], 10)),
  );

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly destroy$: NgDestroyService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.location$ = this.locations$.pipe(
      filter(locations => Boolean(locations)),
      withLatestFrom(this.locationId$),
      map(([locations, locationId]) => locations?.find(({ id }) => locationId === id) || {}),
      takeUntil(this.destroy$),
    );

    this.subscribeToActionSuccess();
  }

  public save(location: UserLocation): void {
    this.locationId$.pipe(takeUntil(this.destroy$)).subscribe(locationId => {
      if (locationId) {
        this.store.dispatch(new UserLocationActions.UpdateUserLocation(location));
      } else {
        this.store.dispatch(new UserLocationActions.CreateUserLocation(location));
      }
    });
  }

  public delete(id: number): void {
    this.store.dispatch(new UserLocationActions.DeleteUserLocation(id));
  }

  private subscribeToActionSuccess(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(
          UserLocationActions.CreateUserLocation,
          UserLocationActions.DeleteUserLocation,
          UserLocationActions.UpdateUserLocation,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }
}
