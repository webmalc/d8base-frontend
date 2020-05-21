import { TestBed } from '@angular/core/testing';

import { EducationApiService } from './education-api.service';

describe('EducationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationApiService = TestBed.get(EducationApiService);
    expect(service).toBeTruthy();
  });
});
