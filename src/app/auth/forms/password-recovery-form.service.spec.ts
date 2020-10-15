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

    it('should be created', () => {
        const service: PasswordRecoveryFormService = TestBed.inject(PasswordRecoveryFormService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});

  // TODO: test validators
