import {TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepFiveFormService} from './service-publish-step-five-form.service';

describe('ServicePublishStepFiveFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule
        ],
        providers: [
            ServicePublishStepFiveFormService
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishStepFiveFormService = TestBed.inject(ServicePublishStepFiveFormService);
        expect(service).toBeTruthy();
    });
});
