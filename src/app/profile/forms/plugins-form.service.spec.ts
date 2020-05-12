import {TestBed} from '@angular/core/testing';

import {PluginsFormService} from './plugins-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {UserPluginApiService} from '../services/user-plugin-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PluginsFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientTestingModule],
        providers: [PluginsFormService, UserPluginApiService]
    }));

    it('should be created', () => {
        const service: PluginsFormService = TestBed.inject(PluginsFormService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
