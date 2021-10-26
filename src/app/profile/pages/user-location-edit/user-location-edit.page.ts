import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLocation } from '@app/api/models';
import { NavParams, NavPath } from '@app/core/constants/navigation.constants';
import { toNumber } from '@app/core/functions/string.functions';
import * as UserLocationActions from '@app/store/current-user/user-locations/user-locations.actions';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-location-edit',
  templateUrl: './user-location-edit.page.html',
  styleUrls: ['./user-location-edit.page.scss'],
})
export class UserLocationEditPage implements OnInit {
  @Select(UserLocationSelectors.locations)
  public locations$: Observable<UserLocation[]>;

  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  public location$: Observable<UserLocation>;

  private readonly locationId$: Observable<number> = this.route.params.pipe(
    map(params => toNumber(params[NavParams.LocationId])),
  );

  // codebeat:disable[ARITY]
  constructor(private readonly store: Store, private readonly router: Router, private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.location$ = this.locationId$.pipe(
      switchMap(locationId => (!locationId ? this.getEmptyLocation() : this.getLocation(locationId))),
    );
  }

  public save(location: UserLocation): void {
    const action = location.id
      ? this.store.dispatch(new UserLocationActions.UpdateUserLocation(location))
      : this.store.dispatch(new UserLocationActions.CreateUserLocation(location));
    action.subscribe(() => this.navigateToProfile());
  }

  public delete(id: number): void {
    this.store.dispatch(new UserLocationActions.DeleteUserLocation(id)).subscribe(() => this.navigateToProfile());
  }

  public get profileUrl(): string {
    return `/${NavPath.Profile}`;
  }

  private navigateToProfile(): void {
    this.router.navigateByUrl(this.profileUrl);
  }

  private getLocation(locationId): Observable<UserLocation> {
    return this.locations$.pipe(
      filter(locations => Boolean(locations)),
      map(locations => locations?.find(({ id }) => locationId === id) || {}),
    );
  }

  private getEmptyLocation(): Observable<UserLocation> {
    return this.defaultLocation$.pipe(
      map(location => ({
        country: location?.country,
        region: location?.region,
        subregion: location?.subregion,
        city: location?.city,
      })),
    );
  }
}
