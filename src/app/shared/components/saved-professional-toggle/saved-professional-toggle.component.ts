import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Professional } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { exhaustMap, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as UserSavedProfessionalActions from '../../../store/current-user/saved-professionals/saved-professionals.actions';
import UserSavedProfessionalsSelectors from '../../../store/current-user/saved-professionals/saved-professionals.selectors';

@Component({
  selector: 'app-saved-professional-toggle',
  templateUrl: './saved-professional-toggle.component.html',
  styleUrls: ['./saved-professional-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class SavedProfessionalToggleComponent implements OnInit {
  @Input() public professionalId: number;

  public isProfessionalSaved$: Observable<boolean>;
  public showProfessionalSaved$: Observable<boolean>;
  public readonly clicks$ = new Subject<void>();

  @Select(UserSavedProfessionalsSelectors.professionalIds)
  private readonly professionalsIds$: Observable<Professional['id'][]>;

  @Select(CurrentUserSelectors.isAuthenticated)
  private readonly isAuthenticated$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly destroy$: NgDestroyService) {}

  public ngOnInit(): void {
    this.initIsProfessionalSaved();
    this.initShowProfessionalSaved();
    this.subscribeClicksStream();
  }

  private initIsProfessionalSaved(): void {
    this.isProfessionalSaved$ = this.professionalsIds$.pipe(map(savedProfessionals => savedProfessionals?.includes(this.professionalId)));
  }

  private initShowProfessionalSaved(): void {
    this.showProfessionalSaved$ = combineLatest([this.professionalsIds$, this.isAuthenticated$]).pipe(
      map(([isLoaded, isAuthenticated]) => isLoaded && isAuthenticated),
    );
  }

  private subscribeClicksStream(): void {
    this.clicks$
      .pipe(
        withLatestFrom(this.isProfessionalSaved$),
        exhaustMap(([, isProfessionalSaved]) => {
          if (isProfessionalSaved) {
            return this.store.dispatch(new UserSavedProfessionalActions.DeleteUserSavedProfessional(this.professionalId));
          }
          return this.store.dispatch(new UserSavedProfessionalActions.CreateUserSavedProfessional(this.professionalId));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
