import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApiConfiguration, ApiConfigurationInterface} from './api-configuration';

import {ProfessionalsService} from './services/professionals.service';
import {SearchService} from './services/search.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule],
    declarations: [],
    providers: [ApiConfiguration, SearchService, ProfessionalsService],
})
export class ApiModule {
    public static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfiguration,
                    useValue: { rootUrl: customParams.rootUrl },
                },
            ],
        };
    }
}
