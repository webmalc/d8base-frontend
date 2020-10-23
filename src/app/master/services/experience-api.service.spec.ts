import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ExperienceApiService} from './experience-api.service';

describe('ExperienceApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ExperienceApiService
        ]
    }));

    it('should be created', () => {
        const service: ExperienceApiService = TestBed.inject(ExperienceApiService);
        expect(service).toBeTruthy();
    });
});
