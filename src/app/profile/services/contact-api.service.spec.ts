import { TestBed } from '@angular/core/testing';

import { ContactApiService } from './contact-api.service';

describe('ContactApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ContactApiService = TestBed.get(ContactApiService);
    expect(service).toBeTruthy();
  });
});
