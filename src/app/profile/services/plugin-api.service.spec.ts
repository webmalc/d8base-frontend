import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PluginApiService} from './plugin-api.service';

describe('PluginApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            PluginApiService
        ]
    }));

    it('should be created', () => {
        const service: PluginApiService = TestBed.inject(PluginApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
