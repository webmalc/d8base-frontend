import { TestBed } from '@angular/core/testing';

import { ServicePublishStepSevenTimetableFormService } from './service-publish-step-seven-timetable-form.service';

describe('ServicePublishStepSevenTimetableFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepSevenTimetableFormService = TestBed.get(ServicePublishStepSevenTimetableFormService);
    expect(service).toBeTruthy();
  });
});
