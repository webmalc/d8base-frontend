import { TestBed } from '@angular/core/testing';

import { UserContactApiService } from './user-contact-api.service';

describe('ContactApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserContactApiService = TestBed.get(UserContactApiService);
    expect(service).toBeTruthy();
  });
});
