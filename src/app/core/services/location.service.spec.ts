import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            LocationService,
        ],
    }));

    it('should be created', () => {
        const service: LocationService = TestBed.inject(LocationService);
        expect(service).toBeTruthy();
    });
});
