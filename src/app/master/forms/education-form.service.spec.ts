import { TestBed } from '@angular/core/testing';

import { EducationFormService } from './education-form.service';

describe('EducationFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationFormService = TestBed.get(EducationFormService);
    expect(service).toBeTruthy();
  });
});
