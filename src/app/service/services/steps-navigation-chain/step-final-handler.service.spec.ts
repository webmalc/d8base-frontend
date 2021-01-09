import {TestBed} from '@angular/core/testing';

import {StepFinalHandlerService} from './step-final-handler.service';

describe('StepFinalHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepFinalHandlerService,
        ],
    }));

    it('should be created', () => {
        const service: StepFinalHandlerService = TestBed.inject(StepFinalHandlerService);
        expect(service).toBeTruthy();
    });
});
