import {TestBed} from '@angular/core/testing';

import {FileService} from './file.service';

describe('FileService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [FileService]
    }));

    it('should be created', () => {
        const service: FileService = TestBed.inject(FileService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');

});
