import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {TagsReadonlyApiService} from './tags-readonly-api.service';

describe('TagsReadonlyApiService', () => {
    let service: TagsReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(TagsReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
