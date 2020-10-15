import {TestBed} from '@angular/core/testing';

import {StepThreeHandlerService} from './step-three-handler.service';

describe('StepThreeHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepThreeHandlerService
        ]
    }));

    it('should be created', () => {
        const service: StepThreeHandlerService = TestBed.inject(StepThreeHandlerService);
        expect(service).toBeTruthy();
    });
});
