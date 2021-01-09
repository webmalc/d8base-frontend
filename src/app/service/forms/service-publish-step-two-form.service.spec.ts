import {TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepTwoFormService} from './service-publish-step-two-form.service';

describe('ServicePublishStepTwoFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule,
        ],
        providers: [
            ServicePublishStepTwoFormService,
        ],
    }));

    it('should be created', () => {
        const service: ServicePublishStepTwoFormService = TestBed.inject(ServicePublishStepTwoFormService);
        expect(service).toBeTruthy();
    });
});
