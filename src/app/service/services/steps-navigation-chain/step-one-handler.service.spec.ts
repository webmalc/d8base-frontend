import {TestBed} from '@angular/core/testing';

import {StepOneHandlerService} from './step-one-handler.service';

describe('StepOneHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepOneHandlerService,
        ],
    }));

    it('should be created', () => {
        const service: StepOneHandlerService = TestBed.inject(StepOneHandlerService);
        expect(service).toBeTruthy();
    });
});
