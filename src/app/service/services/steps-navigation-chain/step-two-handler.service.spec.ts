import {TestBed} from '@angular/core/testing';

import {StepTwoHandlerService} from './step-two-handler.service';

describe('StepTwoHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepTwoHandlerService
        ]
    }));

    it('should be created', () => {
        const service: StepTwoHandlerService = TestBed.inject(StepTwoHandlerService);
        expect(service).toBeTruthy();
    });
});
