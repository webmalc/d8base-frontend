import {TestBed} from '@angular/core/testing';

import {RegistrationFormService} from './registration-form.service';
import {FormBuilder} from '@angular/forms';

describe('RegistrationFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FormBuilder,
            RegistrationFormService
        ]
    }));

    it('should be created', () => {
        const service: RegistrationFormService = TestBed.get(RegistrationFormService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});

  // TODO: test validators
