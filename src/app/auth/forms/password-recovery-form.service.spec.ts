import {TestBed} from '@angular/core/testing';

import {FormBuilder} from '@angular/forms';
import {PasswordRecoveryFormService} from './password-recovery-form.service';

describe('PasswordRecoveryFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FormBuilder,
            PasswordRecoveryFormService
        ]
    }));

    xit('should be created', () => {
        const service: PasswordRecoveryFormService = TestBed.get(PasswordRecoveryFormService);
        expect(service).toBeTruthy();
    });
});

  // TODO: test validators
