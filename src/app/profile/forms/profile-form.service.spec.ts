import { TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { User } from '../../core/models/user';
import { ProfileFormFields } from '../enums/profile-form-fields';
import { ProfileFormService } from './profile-form.service';

describe('ProfileFormService', () => {
    let service: ProfileFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormBuilder,
            ],
        });
        service = TestBed.inject(ProfileFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('should create form with empty validation settings', () => {
        const user = new User();
        // service.setValidators([], []);
        const form = service.createForm(user);

        expect(form).toBeTruthy();

        // Check one validation
        const langFormControl = form.get(ProfileFormFields.Languages);
        langFormControl.setValue(['EN']);
        const validatorFn = langFormControl.validator;
        expect(validatorFn(langFormControl)).toEqual({ restrictEnum: true });
    });

    xit('should create form with real validation settings', () => {
        // const user = new User();
        // const language = new Language();
        // language.code = 'RU';
        // const addLanguage = new Language();
        // addLanguage.code = 'EN';
        // service.setValidators([language, addLanguage], [addLanguage]);
        // const form = service.createForm(user);
        //
        // expect(form).toBeTruthy();
        //
        // // Check one validation
        // const langFormControl = form.get(ProfileFormFields.Languages);
        // langFormControl.setValue(language.code);
        // const validatorFn = langFormControl.validator;
        // let error: ValidationErrors | null;
        // error = validatorFn(langFormControl);
        // expect(error).toBeNull();
        //
        // langFormControl.setValue('fake');
        // error = validatorFn(langFormControl);
        // expect(error).toEqual({ restrictEnum: true });
    });
});
