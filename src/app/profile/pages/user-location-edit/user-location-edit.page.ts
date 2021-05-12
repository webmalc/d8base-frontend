import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLocation } from '@app/api/models';
import * as UserLocationActions from '@app/store/current-user/user-locations/user-locations.actions';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-user-location-edit',
  templateUrl: './user-location-edit.page.html',
  styleUrls: ['./user-location-edit.page.scss'],
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
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.location$ = this.locations$.pipe(
      filter(locations => Boolean(locations)),
      withLatestFrom(this.locationId$),
      map(([locations, locationId]) => locations?.find(({ id }) => locationId === id) || {}),
    );
  }

  public save(location: UserLocation): void {
    const action = location.id
      ? this.store.dispatch(new UserLocationActions.UpdateUserLocation(location))
      : this.store.dispatch(new UserLocationActions.CreateUserLocation(location));
    action.subscribe(() => this.navigateToProfile());
  }

  public delete(id: number): void {
    this.store.dispatch(new UserLocationActions.DeleteUserLocation(id))
      .subscribe(() => this.navigateToProfile());
  }

  private navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
