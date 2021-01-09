import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SubregionApiService} from './subregion-api.service';

describe('SubregionApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SubregionApiService],
    }));

    it('should be created', () => {
        const service: SubregionApiService = TestBed.inject(SubregionApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');

});
