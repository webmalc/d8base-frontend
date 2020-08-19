import {TestBed} from '@angular/core/testing';

import {StepSixHandlerService} from './step-six-handler.service';

describe('StepSixHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepSixHandlerService = TestBed.get(StepSixHandlerService);
    expect(service).toBeTruthy();
  });
});
