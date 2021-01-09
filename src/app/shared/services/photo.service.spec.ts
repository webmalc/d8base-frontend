import {TestBed} from '@angular/core/testing';

import {PhotoService} from './photo.service';

describe('PhotoService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [PhotoService],
    }));

    it('should be created', () => {
        const service: PhotoService = TestBed.inject(PhotoService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
