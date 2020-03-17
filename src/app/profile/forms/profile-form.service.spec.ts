import {TestBed} from '@angular/core/testing';

import {FormBuilder} from '@angular/forms';
import {User} from '../../core/models/user';
import {ProfileFormService} from './profile-form.service';

describe('ProfileFormService', () => {
    let service: ProfileFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormBuilder
            ]
        });
        service = TestBed.inject(ProfileFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create form', () => {
        const user = new User();
        const form = service.createForm(user);
        expect(form).toBeTruthy();
    });
});
