import {TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepSevenDepartureFormService} from './service-publish-step-seven-departure-form.service';

describe('ServicePublishStepSevenDepartureFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule
        ],
        providers: [
            ServicePublishStepSevenDepartureFormService
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishStepSevenDepartureFormService = TestBed.inject(ServicePublishStepSevenDepartureFormService);
        expect(service).toBeTruthy();
    });
});
