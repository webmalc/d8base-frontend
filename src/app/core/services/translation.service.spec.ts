import {TestBed} from '@angular/core/testing';

import {TranslationService} from './translation.service';
import {TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TranslationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TranslateModule.forRoot(),
            IonicStorageModule.forRoot(),
            HttpClientTestingModule
        ],
        providers: [
            TranslationService
        ]
    }));

    it('should be created', () => {
        const service: TranslationService = TestBed.inject(TranslationService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
