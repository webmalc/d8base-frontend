import {TestBed} from '@angular/core/testing';

import {StepSevenHandlerService} from './step-seven-handler.service';

describe('StepSevenHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepSevenHandlerService
        ]
    }));

    it('should be created', () => {
        const service: StepSevenHandlerService = TestBed.inject(StepSevenHandlerService);
        expect(service).toBeTruthy();
    });
});
