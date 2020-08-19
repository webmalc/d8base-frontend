import {TestBed} from '@angular/core/testing';

import {StepSevenHandlerService} from './step-seven-handler.service';

describe('StepSevenHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepSevenHandlerService = TestBed.get(StepSevenHandlerService);
    expect(service).toBeTruthy();
  });
});
