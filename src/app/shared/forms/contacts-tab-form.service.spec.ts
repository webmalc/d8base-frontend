import { TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { ContactsTabFormService } from './contacts-tab-form.service';

describe('ContactsTabFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ContactsTabFormService],
    }),
  );

  it('should be created', () => {
    const service: ContactsTabFormService = TestBed.inject(ContactsTabFormService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
