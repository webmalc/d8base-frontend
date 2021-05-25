import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EducationApiService } from './education-api.service';

describe('EducationApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EducationApiService],
    }),
  );

  it('should be created', () => {
    const service: EducationApiService = TestBed.inject(EducationApiService);
    expect(service).toBeTruthy();
  });
});
