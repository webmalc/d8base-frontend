import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalList, ProfessionalLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { LocationService } from '@app/core/services/location.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import * as ProfessionalLocationActions from '@app/store/professional-page/professional-locations/professional-locations.actions';
import ProfessionalLocationSelectors from '@app/store/professional-page/professional-locations/professional-locations.selectors';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

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

  public locationId: ProfessionalLocation['id'];
  public location$: Observable<ProfessionalLocation>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly destroy$: NgDestroyService,
    private readonly actions$: Actions,
  ) {}

  public ngOnInit(): void {
    this.locationId = this.getItemId();

    this.location$ = this.locations$.pipe(
      filter(locations => Boolean(locations)),
      withLatestFrom(this.professional$),
      map(
        ([locations, professional]) =>
          locations?.find(({ id }) => this.locationId === id) || { professional: professional.id },
      ),
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

  private getItemId(): number {
    return parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
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
        this.router.navigate(['/professional']);
      });
  }
}
