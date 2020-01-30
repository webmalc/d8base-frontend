import {TestBed} from '@angular/core/testing';

import {TranslationService} from './translation.service';
import {TranslateService} from '@ngx-translate/core';
import {TranslateServiceMock} from '../mock/translate-service-mock';

describe('TranslationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: TranslateService, useClass: TranslateServiceMock}
        ]
    }));

    it('should be created', () => {
        const service: TranslationService = TestBed.get(TranslationService);
        expect(service).toBeTruthy();
    });
});
