import {TestBed} from '@angular/core/testing';

import {StepOneHandlerService} from './step-one-handler.service';

describe('StepOneHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepOneHandlerService = TestBed.get(StepOneHandlerService);
    expect(service).toBeTruthy();
  });
});
