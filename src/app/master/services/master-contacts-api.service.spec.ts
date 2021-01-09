import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterContactsApiService } from './master-contacts-api.service';

describe('MasterContactsApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            MasterContactsApiService,
        ],
    }));

    it('should be created', () => {
        const service: MasterContactsApiService = TestBed.inject(MasterContactsApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
