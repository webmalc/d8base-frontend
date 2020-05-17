import {TestBed} from '@angular/core/testing';

import {RegionApiService} from './region-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RegionApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegionApiService]
    }));

    it('should be created', () => {
        const service: RegionApiService = TestBed.inject(RegionApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');

});
