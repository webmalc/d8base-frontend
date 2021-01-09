import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePublishStepOneFormService } from './service-publish-step-one-form.service';

describe('ServicePublishStepOneFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule,
        ],
        providers: [
            ServicePublishStepOneFormService,
        ],
    }));

    it('should be created', () => {
        const service: ServicePublishStepOneFormService = TestBed.inject(ServicePublishStepOneFormService);
        expect(service).toBeTruthy();
    });
});
