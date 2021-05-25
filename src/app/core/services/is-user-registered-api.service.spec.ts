import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IsUserRegisteredApiService } from './is-user-registered-api.service';

describe('IsUserRegisteredApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [IsUserRegisteredApiService],
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: IsUserRegisteredApiService = TestBed.inject(IsUserRegisteredApiService);
    expect(service).toBeTruthy();
  });
});
