import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ServiceTagsReadonlyApiService } from './service-tags-readonly-api.service';

describe('ServiceTagsReadonlyApiService', () => {
  let service: ServiceTagsReadonlyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServiceTagsReadonlyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
