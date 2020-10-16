import {TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepSevenTimetableFormService} from './service-publish-step-seven-timetable-form.service';

describe('ServicePublishStepSevenTimetableFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule, FormsModule
        ],
        providers: [
            ServicePublishStepSevenTimetableFormService
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishStepSevenTimetableFormService = TestBed.inject(ServicePublishStepSevenTimetableFormService);
        expect(service).toBeTruthy();
    });
});
