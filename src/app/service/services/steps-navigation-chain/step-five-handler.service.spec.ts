import {TestBed} from '@angular/core/testing';

import {StepFiveHandlerService} from './step-five-handler.service';

describe('StepFiveHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepFiveHandlerService = TestBed.get(StepFiveHandlerService);
    expect(service).toBeTruthy();
  });
});
