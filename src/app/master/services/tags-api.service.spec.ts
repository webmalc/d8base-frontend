import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TagsApiService} from './tags-api.service';

describe('TagsApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TagsApiService],
    }));

    it('should be created', () => {
        const service: TagsApiService = TestBed.inject(TagsApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
