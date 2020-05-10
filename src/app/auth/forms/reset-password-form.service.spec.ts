import {TestBed} from '@angular/core/testing';

import {ResetPasswordFormService} from './reset-password-form.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('ResetPasswordFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
        ]
    }));

    it('should be created', () => {
        const service: ResetPasswordFormService = TestBed.inject(ResetPasswordFormService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
