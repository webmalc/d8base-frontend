import {TestBed} from '@angular/core/testing';

import {EducationApiService} from './education-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EducationApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EducationApiService]
    }));

    it('should be created', () => {
        const service: EducationApiService = TestBed.inject(EducationApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
