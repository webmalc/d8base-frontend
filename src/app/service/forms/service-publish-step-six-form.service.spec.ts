import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePublishStepSixFormService } from './service-publish-step-six-form.service';

describe('ServicePublishStepSixFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [ServicePublishStepSixFormService],
    }),
  );

  it('should be created', () => {
    const service: ServicePublishStepSixFormService = TestBed.inject(ServicePublishStepSixFormService);
    expect(service).toBeTruthy();
  });
});
