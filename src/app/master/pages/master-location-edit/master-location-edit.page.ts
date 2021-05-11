import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalList, ProfessionalLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as ProfessionalLocationActions from '@app/store/professional-page/professional-locations/professional-locations.actions';
import ProfessionalLocationSelectors from '@app/store/professional-page/professional-locations/professional-locations.selectors';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

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

  public location$: Observable<ProfessionalLocation>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly destroy$: NgDestroyService,
    private readonly actions$: Actions,
  ) {}

  public ngOnInit(): void {
    this.location$ = this.locations$.pipe(
      filter(locations => Boolean(locations)),
      switchMap(locations =>
        combineLatest([this.professional$, this.route.params]).pipe(
          map(
            ([professional, params]) =>
              locations?.find(({ id }) => parseInt(params['location-id'], 10) === id) || {
                professional: professional?.id,
              },
          ),
        ),
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
