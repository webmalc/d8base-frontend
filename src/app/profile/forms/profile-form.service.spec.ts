import { TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
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
    const user = {};
    const form = service.createForm(user);

    expect(form).toBeTruthy();

    // Check one validation
    const langFormControl = form.get(ProfileFormFields.Languages);
    langFormControl.setValue(['EN']);
    const validatorFn = langFormControl.validator;
    expect(validatorFn(langFormControl)).toEqual({ restrictEnum: true });
  });
});
