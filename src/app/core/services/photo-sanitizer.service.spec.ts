import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {PhotoSanitizerService} from './photo-sanitizer.service';

describe('PhotoSanitizerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: DomSanitizer, useValue: {sanitize: () => 'test'}}
        ]
    }));

    it('should be created', () => {
        const service: PhotoSanitizerService = TestBed.inject(PhotoSanitizerService);
        expect(service).toBeTruthy();
    });
});
