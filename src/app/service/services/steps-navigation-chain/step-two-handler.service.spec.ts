import {TestBed} from '@angular/core/testing';

import {StepTwoHandlerService} from './step-two-handler.service';

describe('StepTwoHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepTwoHandlerService = TestBed.get(StepTwoHandlerService);
    expect(service).toBeTruthy();
  });
});
