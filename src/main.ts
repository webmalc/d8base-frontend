import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// https://stackoverflow.com/a/57466604/3725361
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

if (environment.sentry.enabled && environment.sentry.dsn) {
  Sentry.init({
    dsn: environment.sentry.dsn,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: [ environment.origin ],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});

defineCustomElements(window);
