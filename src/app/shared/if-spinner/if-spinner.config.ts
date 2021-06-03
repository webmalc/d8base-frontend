import { InjectionToken, Type } from '@angular/core';

export interface IfSpinnerConfigurationInterface {
  errorComponent?: Type<any>;
  loadingComponent?: Type<any>;
}
export const IF_SPINNER_MODULE_CONFIG_TOKEN = new InjectionToken<IfSpinnerConfigurationInterface>(
  'IfSpinner module config token',
);

