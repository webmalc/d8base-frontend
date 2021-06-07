import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window.token';

export const NAVIGATOR = new InjectionToken<Navigator>(
  'navigator object',
  {
    factory: () => inject(WINDOW).navigator,
  },
);
