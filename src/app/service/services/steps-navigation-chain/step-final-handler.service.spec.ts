import {TestBed} from '@angular/core/testing';

import {StepFinalHandlerService} from './step-final-handler.service';

describe('StepFinalHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepFinalHandlerService = TestBed.get(StepFinalHandlerService);
    expect(service).toBeTruthy();
  });
});
