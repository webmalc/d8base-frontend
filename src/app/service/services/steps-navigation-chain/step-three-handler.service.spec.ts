import {TestBed} from '@angular/core/testing';

import {StepThreeHandlerService} from './step-three-handler.service';

describe('StepThreeHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepThreeHandlerService = TestBed.get(StepThreeHandlerService);
    expect(service).toBeTruthy();
  });
});
