import {TestBed} from '@angular/core/testing';

import {PasswordRecoveryFormService} from './password-recovery-form.service';
import {FormBuilder} from '@angular/forms';

describe('PasswordRecoveryFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FormBuilder,
            PasswordRecoveryFormService
        ]
    }));

    it('should be created', () => {
        const service: PasswordRecoveryFormService = TestBed.get(PasswordRecoveryFormService);
        expect(service).toBeTruthy();
    });
});

  // TODO: test validators
