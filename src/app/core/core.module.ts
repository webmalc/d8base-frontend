import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { throwIfAlreadyLoaded } from '@app/core/functions/module.functions';
import { MustBeAuthorizedGuard } from '@app/core/services/guards/must-be-authorized.guard';
import { CurrentUserFacadeService, LoaderEffects, UserSettingsService } from '@app/core/services/facades';
import {
  AuthInterceptor,
  HeadersInterceptor,
  LangInterceptorService,
  TimezoneInterceptor,
} from '@app/core/services/interceptors';
import {
  FirebaseService,
  LoadingIndicatorService,
  PlatformService,
  TitleService,
  TranslationService,
  DarkModeService,
  AuthenticationService,
  ToastService,
  CurrentLocationService,
  MasterManagerService,
  ServiceManagerService,
  UserManagerService,
  GuessLocationByIpService,
  LocationResolverService,
  ApiClientService,
  IsUserRegisteredApiService,
  SearchQueryService,
  SearchFilterStateService,
  SearchFilterStateConverter,
  ContactsMergeToDefaultService,
  StorageManagerService,
  TagsManagerService,
  NewMessagesNotificationService,
  IntervalService,
} from '@app/core/services';
import {
  CategoriesApiCache,
  CitiesApiCache,
  ContactsApiCache,
  CountriesApiCache,
  DistrictsApiCache,
  LanguagesApiCache,
  PostalCodeApiCache,
  RatesApiCache,
  RegionsApiCache,
  SubcategoriesApiCache,
  SubregionsApiCache,
  UserLanguagesApiCache,
} from '@app/core/services/cache';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { environment } from '@env/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneInterceptor,
      multi: true,
    },
    FirebaseService,
    LoadingIndicatorService,
    PlatformService,
    TitleService,
    TranslationService,

    DarkModeService,
    AuthenticationService,
    ToastService,
    CurrentLocationService,
    MasterManagerService,
    ServiceManagerService,
    UserManagerService,
    GuessLocationByIpService,
    LocationResolverService,
    StorageManagerService,
    TagsManagerService,

    ApiClientService,
    IsUserRegisteredApiService,

    CategoriesApiCache,
    CitiesApiCache,
    ContactsApiCache,
    CountriesApiCache,
    DistrictsApiCache,
    LanguagesApiCache,
    PostalCodeApiCache,
    RatesApiCache,
    RegionsApiCache,
    SubcategoriesApiCache,
    SubregionsApiCache,
    UserLanguagesApiCache,

    MustBeAuthorizedGuard,

    CurrentUserFacadeService,
    UserSettingsService,
    LoaderEffects,

    SearchFilterStateService,
    SearchFilterStateConverter,
    SearchQueryService,

    ContactsMergeToDefaultService,
    NewMessagesNotificationService,
    IntervalService,
  ],
})
export class CoreModule {
  constructor(
    // instantiating necessary services
    private readonly _platformService: PlatformService,
    private readonly _titleService: TitleService,
    private readonly _loadingIndicatorService: LoadingIndicatorService,
    private readonly _translationService: TranslationService,
    private readonly _firebaseService: FirebaseService,
    // checking if the Core module is already loaded
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule);
  }
}
