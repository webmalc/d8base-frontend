import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ServicePhotoApiService } from './service-photo-api.service';

describe('ServicePhotoApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ServicePhotoApiService
        ]
    }));

    it('should be created', () => {
        const service: ServicePhotoApiService = TestBed.get(ServicePhotoApiService);
        expect(service).toBeTruthy();
    });
});
