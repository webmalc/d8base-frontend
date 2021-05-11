/*eslint max-lines: ["error", 500]*/
import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { GrantTypes } from '@app/auth/enums/grant-types';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { LoginDataInterface } from '@app/core/interfaces/login-data-interface';
import { RefreshDataInterface } from '@app/core/interfaces/refresh-data-interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { CurrentPositionService } from '@app/core/services/location/current-position.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import * as UserLanguagesActions from '@app/store/current-user/user-language-state/user-language.actions';
import { environment } from '@env/environment';
import { Storage } from '@ionic/storage';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CurrentUserStateModel } from './current-user-state.model';
import * as CurrentUserActions from './current-user.actions';
import { guestState, notLoadedState } from './current-user.constants';
import * as SavedUserProfessionalsActions from './saved-professionals/saved-professionals.actions';
import { UserSavedProfessionalState } from './saved-professionals/saved-professionals.state';
import * as UserContactActions from './user-contacts/user-contacts.actions';
import { UserContactState } from './user-contacts/user-contacts.state';
import { UserLanguageState } from './user-language-state/user-language.state';
import { UserLocationState } from './user-locations/user-locations.state';
import * as UserLocationActions from './user-locations/user-locations.actions';


const TOKEN_OBTAIN_URL = environment.backend.auth;
const TOKEN_DATA_STORAGE_KEY = 'api_token_data';
const USER_SETTINGS_STORAGE_KEY = 'user_settings';

export const isAuthenticated = (state: CurrentUserStateModel): boolean => {
  const { tokens } = state;
  return Boolean(tokens?.access_token);
};

@State<CurrentUserStateModel>({
  name: 'currentUser',
  defaults: notLoadedState,
  children: [UserLanguageState, UserSavedProfessionalState, UserContactState, UserLocationState],
})
@Injectable()
export class CurrentUserState implements NgxsOnInit {
  constructor(
    private readonly api: AccountsService,
    private readonly storage: Storage,
    private readonly client: ApiClientService,
    private readonly servicePublicationState: ServicePublishDataHolderService,
    private readonly locationService: CurrentPositionService,
  ) {}

  public ngxsOnInit(context: StateContext<CurrentUserStateModel>): void {
    context.dispatch(new CurrentUserActions.Initialize());
  }

  @Action(CurrentUserActions.Initialize)
  public initialize({ patchState, dispatch }: StateContext<CurrentUserStateModel>): Observable<any> {
    return from(this.storage.get(TOKEN_DATA_STORAGE_KEY)).pipe(
      tap(tokens => {
        if (!tokens) {
          patchState(guestState);
          dispatch(new CurrentUserActions.RestoreSettingsLocal());
        } else {
          patchState({ tokens });
          dispatch(new CurrentUserActions.LoadProfile());
        }
      }),
    );
  }

  @Action(CurrentUserActions.Login)
  public login(
    { patchState, dispatch }: StateContext<CurrentUserStateModel>,
    { credentials }: CurrentUserActions.Login,
  ): Observable<any> {
    patchState(notLoadedState);
    return this.client
      .post<AuthResponseInterface, LoginDataInterface>(TOKEN_OBTAIN_URL, {
        username: credentials.username,
        password: credentials.password,
        grant_type: GrantTypes.PasswordGrantType,
        client_id: environment.client_id,
        client_secret: environment.client_secret,
      })
      .pipe(
        catchError(error => {
          if (400 === error.status && error.error.error === 'invalid_grant') {
            patchState({ errors: ['login-page.incorrect-login-data'] });
          }
          return throwError(error);
        }),
        switchMap(result => from(this.storage.set(TOKEN_DATA_STORAGE_KEY, result))),
        tap(tokens => {
          patchState({ tokens });
        }),
        mergeMap(() => dispatch(new CurrentUserActions.LoadProfile())),
      );
  }

  @Action(CurrentUserActions.Logout)
  public logout({ setState, getState }: StateContext<CurrentUserStateModel>): Observable<any> {
    const { settings } = getState();
    return from(
      this.servicePublicationState
        .reset()
        .then(() => this.storage.remove(TOKEN_DATA_STORAGE_KEY))
        .then(() => setState({ ...guestState, settings })),
    );
  }

  @Action(CurrentUserActions.AuthenticateWithToken)
  public authenticateWithToken(
    { patchState, dispatch }: StateContext<CurrentUserStateModel>,
    { tokens }: CurrentUserActions.AuthenticateWithToken,
  ): Observable<any> {
    return from(this.storage.set(TOKEN_DATA_STORAGE_KEY, tokens)).pipe(
      tap(tokens => patchState({ tokens })),
      mergeMap(() => dispatch(new CurrentUserActions.LoadProfile())),
    );
  }

  @Action(CurrentUserActions.CreateProfessional)
  public createProfessional(
    { dispatch }: StateContext<CurrentUserStateModel>,
    { master }: CurrentUserActions.CreateProfessional,
  ) {
    return this.api.accountsProfilePartialUpdate({ account_type: 'professional' }).pipe(
      switchMap(() => this.api.accountsProfessionalsCreate(master)),
      switchMap(() => dispatch(new CurrentUserActions.LoadProfile())),
    );
  }

  @Action(CurrentUserActions.LoadProfile)
  public loadProfile({ patchState, dispatch }: StateContext<CurrentUserStateModel>) {
    return this.api.accountsProfileList().pipe(
      tap(profile => {
        patchState({ profile: profile as Profile }); // TODO fix swagger
      }),
      mergeMap(() =>
        dispatch([
          new CurrentUserActions.LoadSettings(),
          new CurrentUserActions.LoadProfessionals(),
          new UserLocationActions.LoadAllUserLocations(),
          new UserLanguagesActions.LoadAllUserLanguages(),
          new SavedUserProfessionalsActions.LoadAllUserSavedProfessionals(),
          new UserContactActions.LoadAllUserContacts(),
        ]),
      ),
    );
  }

  @Action(CurrentUserActions.LoadProfessionals)
  public loadProfessionals({ patchState }: StateContext<CurrentUserStateModel>) {
    return this.api
      .accountsProfessionalsList({})
      .pipe(tap(response => patchState({ professionals: response.results })));
  }

  @Action(CurrentUserActions.Register)
  public register({ dispatch }: StateContext<CurrentUserStateModel>, { user, userData }: CurrentUserActions.Register) {
    return this.api.accountsRegisterCreate(user).pipe(
      // TODO fix swagger; returned user contains the "token" field
      mergeMap((user: any) => dispatch(new CurrentUserActions.AuthenticateWithToken(user.token))),
      mergeMap(() =>
        userData?.location ? dispatch(new UserLocationActions.CreateUserLocation(userData.location)) : of(),
      ),
    );
  }

  @Action(CurrentUserActions.LoadSettings)
  public loadSettings({ patchState, dispatch }: StateContext<CurrentUserStateModel>) {
    return this.api.accountsSettingsList({}).pipe(
      tap(response => {
        const settings = response.results[0];
        dispatch(new CurrentUserActions.StoreSettingsLocal(settings));
        patchState({ settings });
      }),
    );
  }

  @Action(CurrentUserActions.RestoreSettingsLocal)
  public restoreSettings({ patchState }: StateContext<CurrentUserStateModel>) {
    return from(this.storage.get(USER_SETTINGS_STORAGE_KEY)).pipe(tap(settings => patchState({ settings })));
  }

  @Action(CurrentUserActions.ChangeUserSettings)
  public changeUserSettings(
    { getState, patchState, dispatch }: StateContext<CurrentUserStateModel>,
    { changes }: CurrentUserActions.ChangeUserSettings,
  ) {
    const state = getState();
    const isAuthentificated = isAuthenticated(state);
    const { settings } = state;

    const newSettings = {
      ...settings,
      ...changes,
    };

    if (isAuthentificated) {
      dispatch(new CurrentUserActions.SaveSettings(newSettings));
    }
    dispatch(new CurrentUserActions.StoreSettingsLocal(newSettings));

    patchState({ settings: newSettings });
  }

  @Action(CurrentUserActions.SaveSettings)
  public saveUserSettings({}: StateContext<CurrentUserStateModel>, { newSettings }: CurrentUserActions.SaveSettings) {
    const id = newSettings.id;
    const saveSettings$ = id
      ? this.api.accountsSettingsUpdate({ id, data: newSettings })
      : this.api.accountsSettingsCreate(newSettings);
    return saveSettings$;
  }

  @Action(CurrentUserActions.StoreSettingsLocal)
  public storeUserSettings(
    {}: StateContext<CurrentUserStateModel>,
    { newSettings }: CurrentUserActions.StoreSettingsLocal,
  ) {
    return from(this.storage.set(USER_SETTINGS_STORAGE_KEY, newSettings));
  }

  @Action(CurrentUserActions.UpdateProfile)
  public updateProfile(
    { patchState, dispatch, getState }: StateContext<CurrentUserStateModel>,
    { changes }: CurrentUserActions.UpdateProfile,
  ) {
    const { profile } = getState();
    const existingEmail = profile.email;
    const newEmail = changes.email;
    return this.api.accountsProfilePartialUpdate(changes).pipe(
      tap(profile => {
        patchState({ profile });
      }),
      mergeMap(() => {
        if (existingEmail !== newEmail) {
          return dispatch(new CurrentUserActions.RegisterNewEmail(newEmail));
        }
        return of();
      }),
    );
  }

  @Action(CurrentUserActions.RegisterNewEmail)
  public registerNewEmail({}: StateContext<CurrentUserStateModel>, { newEmail }: CurrentUserActions.RegisterNewEmail) {
    return this.api.accountsRegisterEmailCreate({ email: newEmail });
  }

  @Action(CurrentUserActions.ResendEmailVerification)
  public resendEmailVerification() {
    return this.api.accountsResendVerifyRegistrationCreate();
  }

  @Action(CurrentUserActions.VerifyEmailAction)
  public verifyEmail(
    { patchState, getState }: StateContext<CurrentUserStateModel>,
    { verifyEmail }: CurrentUserActions.VerifyEmailAction,
  ) {
    const { profile } = getState();
    const { email, user_id } = verifyEmail;

    if (profile.id !== parseInt(user_id, 10)) {
      throw Error('Try to change another\'s user email');
    }

    return this.api.accountsVerifyEmailCreate(verifyEmail).pipe(
      tap(() => {
        patchState({
          profile: {
            ...profile,
            email,
            is_confirmed: true,
          },
        });
      }),
    );
  }

  @Action(CurrentUserActions.RefreshTokens)
  public refreshTokens({ getState, patchState }: StateContext<CurrentUserStateModel>) {
    const tokens = getState().tokens;
    const refreshData: RefreshDataInterface = {
      refresh_token: tokens.refresh_token,
      grant_type: GrantTypes.RefreshGrantType,
    };
    return this.client
      .post<AuthResponseInterface, RefreshDataInterface>(environment.backend.refresh, refreshData)
      .pipe(tap(tokens => patchState({ tokens })));
  }
}
