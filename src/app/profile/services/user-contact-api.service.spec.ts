import { TestBed } from '@angular/core/testing';

import { UserContactApiService } from './user-contact-api.service';

describe('UserContactApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: UserContactApiService = TestBed.get(UserContactApiService);
    expect(service).toBeTruthy();
  });
});
