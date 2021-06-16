import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfessionalList, UserSavedProfessional } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import UserSavedProfessionalsSelectors from '@app/store/current-user/saved-professionals/saved-professionals.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-saved-professionals',
  templateUrl: './user-saved-professionals.component.html',
  styleUrls: ['./user-saved-professionals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSavedProfessionalsListComponent implements OnInit {
  @Select(UserSavedProfessionalsSelectors.professionalIds)
  public readonly professionalIds$: Observable<UserSavedProfessional['professional'][]>;

  public savedProfessionals$: Observable<ProfessionalList[]>;

  private professionals: ProfessionalList[];

  constructor(private readonly professionalsService: ProfessionalsService) {}

  public ngOnInit(): void {
    this.savedProfessionals$ = this.professionalIds$.pipe(
      switchMap(professionalIds => {
        if (!professionalIds) {
          return of(null);
        }
        const previousProfessionalIds: number[] = this.professionals?.map(({ id }) => id) ?? [];
        const professionalIdsToAdd: number[] =
          professionalIds?.filter(id => !previousProfessionalIds.includes(id)) ?? [];

        const professionals: ProfessionalList[] =
          this.professionals?.filter(({ id }) => professionalIds.includes(id)) ?? [];

        if (professionalIdsToAdd?.length) {
          return this.professionalsService
            .professionalsProfessionalsList({
              pkIn: (professionalIdsToAdd.join(',') as unknown) as number, // TODO fix swagger
            })
            .pipe(map(({ results }) => professionals.concat(results)));
        }
        return of(professionals);
      }),
      tap(professionals => {
        this.professionals = professionals;
      }),
    );
  }
}
