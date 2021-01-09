import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePublishStepFourFormService } from './service-publish-step-four-form.service';

describe('ServicePublishStepFourFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule,
        ],
        providers: [
            ServicePublishStepFourFormService,
        ],
    }));

    it('should be created', () => {
        const service: ServicePublishStepFourFormService = TestBed.inject(ServicePublishStepFourFormService);
        expect(service).toBeTruthy();
    });
});
