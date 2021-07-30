import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@app/core/functions/module.functions';
import {
  AuthInterceptor,
  HeadersInterceptor,
  LangInterceptorService,
  TimezoneInterceptor,
} from '@app/core/services/interceptors';

@NgModule({
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
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule);
  }
}
