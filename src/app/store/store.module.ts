import { ModuleWithProviders, NgModule } from '@angular/core';
import { CurrentUserState, UserLanguageState, ProfessionalPageState } from '@app/store/states';
import { environment } from '@env/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserSavedProfessionalState } from './current-user/saved-professionals/saved-professionals.state';
import { UserContactState } from './current-user/user-contacts/user-contacts.state';
import { UserLocationState } from './current-user/user-locations/user-locations.state';
import { LoaderState } from './loader/loader.state';
import { ProfessionalContactState } from './professional-page/professional-contacts/professional-contacts.state';
import { ProfessionalLocationState } from './professional-page/professional-locations/professional-locations.state';

@NgModule({
  imports: [
    NgxsModule.forRoot(
      [
        LoaderState,
        CurrentUserState,
        UserLanguageState,
        ProfessionalPageState,
        UserSavedProfessionalState,
        UserContactState,
        UserLocationState,
        ProfessionalContactState,
        ProfessionalLocationState,
      ],
      {
        developmentMode: !environment.production,
        selectorOptions: { suppressErrors: false },
      },
    ),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'd8b store',
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {
  public static forRoot(): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [],
    };
  }
}
