import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MasterExperienceReadonlyApiService } from './master-experience-readonly-api.service';

describe('MasterExperienceReadonlyApiService', () => {
    let service: MasterExperienceReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterExperienceReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
