import {TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepSevenFormService} from './service-publish-step-seven-form.service';

describe('ServicePublishStepSevenFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule
        ],
        providers: [
            ServicePublishStepSevenFormService
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishStepSevenFormService = TestBed.inject(ServicePublishStepSevenFormService);
        expect(service).toBeTruthy();
    });
});
