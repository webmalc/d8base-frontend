import {TestBed} from '@angular/core/testing';

import {StepFourHandlerService} from './step-four-handler.service';

describe('StepFourHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepFourHandlerService = TestBed.get(StepFourHandlerService);
    expect(service).toBeTruthy();
  });
});
