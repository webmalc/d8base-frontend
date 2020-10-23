import {TestBed} from '@angular/core/testing';

import {FormBuilder} from '@angular/forms';
import {RegistrationFormService} from './registration-form.service';

describe('RegistrationFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FormBuilder,
            RegistrationFormService
        ]
    }));

    it('should be created', () => {
        const service: RegistrationFormService = TestBed.inject(RegistrationFormService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});

  // TODO: test validators
