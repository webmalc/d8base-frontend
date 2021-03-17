import { ModuleWithProviders, NgModule } from '@angular/core';
import { CurrentUserState, UserLanguageState, ProfessionalPageState } from '@app/store/states';
import { environment } from '@env/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserSavedProfessionalState } from './current-user/saved-professionals/saved-professionals.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      CurrentUserState,
      UserLanguageState,
      ProfessionalPageState,
      UserSavedProfessionalState,
    ], {
      developmentMode: !environment.production,
      selectorOptions: { suppressErrors: false },
    }),
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
