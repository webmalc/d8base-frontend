import { Injectable } from '@angular/core';
import { ProfessionalLocation } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as ProfessionalLocationActions from './professional-locations.actions';

export const emptyProfessionalLocationState: ProfessionalLocation[] = null;

export type ProfessionalLocationStateModel = ProfessionalLocation[];

@Injectable()
@State<ProfessionalLocationStateModel>({
  name: 'ProfessionalLocation',
  defaults: emptyProfessionalLocationState,
})
export class ProfessionalLocationState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(ProfessionalLocationActions.LoadAllProfessionalLocations)
  public loadAllProfessionalLocations({ setState }: StateContext<ProfessionalLocationStateModel>): Observable<any> {
    return this.accountsService.accountsProfessionalLocationsList({}).pipe(
      tap(({ results }) => {
        setState(results);
      }),
    );
  }

  @Action(ProfessionalLocationActions.CreateProfessionalLocation)
  public createProfessionalLocation(
    { setState, getState }: StateContext<ProfessionalLocationStateModel>,
    { location }: ProfessionalLocationActions.CreateProfessionalLocation,
  ): Observable<any> {
    return this.accountsService.accountsProfessionalLocationsCreate(location).pipe(
      tap(newProfessionalLocation => {
        const locations = getState();
        setState(locations.concat(newProfessionalLocation));
      }),
    );
  }

  @Action(ProfessionalLocationActions.UpdateProfessionalLocation)
  public updateProfessionalLocation(
    { setState, getState }: StateContext<ProfessionalLocationStateModel>,
    { location }: ProfessionalLocationActions.UpdateProfessionalLocation,
  ): Observable<any> {
    return this.accountsService.accountsProfessionalLocationsUpdate({ id: location.id, data: location }).pipe(
      tap(() => {
        const locations = getState();
        const updatedLocations = locations.map(existingLocation => {
          if (existingLocation.id === location.id) {
            return location;
          }
          return existingLocation;
        });
        setState(updatedLocations);
      }),
    );
  }

  @Action(ProfessionalLocationActions.DeleteProfessionalLocation)
  public deleteProfessionalLocation(
    { setState, getState }: StateContext<ProfessionalLocationStateModel>,
    { locationId: locationIdToDelete }: ProfessionalLocationActions.DeleteProfessionalLocation,
  ): Observable<any> {
    const locations = getState();
    const idToDelete = locations.find(({ id }) => id === locationIdToDelete)?.id;
    return this.accountsService.accountsProfessionalLocationsDelete(idToDelete).pipe(
      tap(() => {
        setState(locations.filter(({ id }) => id !== idToDelete));
      }),
    );
  }
}
