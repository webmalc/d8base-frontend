import {TestBed} from '@angular/core/testing';

import {FormBuilder} from '@angular/forms';
import {LoginFormService} from './login-form.service';

describe('LoginFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FormBuilder,
            LoginFormService
        ]
    }));

    it('should be created', () => {
        const service: LoginFormService = TestBed.get(LoginFormService);
        expect(service).toBeTruthy();
    });
});

  // TODO: test validators
