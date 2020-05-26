import { TestBed } from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import { ExperienceFormService } from './experience-form.service';

describe('ExperienceFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule
        ],
        providers: [
            ExperienceFormService
        ]
    }));

    it('should be created', () => {
        const service: ExperienceFormService = TestBed.inject(ExperienceFormService);
        expect(service).toBeTruthy();
    });
});
