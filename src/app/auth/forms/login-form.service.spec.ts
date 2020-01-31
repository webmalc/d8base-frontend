import {TestBed} from '@angular/core/testing';

import {LoginFormService} from './login-form.service';
import {FormBuilder} from '@angular/forms';

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
