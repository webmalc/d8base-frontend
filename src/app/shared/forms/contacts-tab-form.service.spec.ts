import { TestBed } from '@angular/core/testing';

import { ContactsTabFormService } from './contacts-tab-form.service';

describe('ContactsTabFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ContactsTabFormService = TestBed.get(ContactsTabFormService);
    expect(service).toBeTruthy();
  });
});
