import {TestBed} from '@angular/core/testing';

import {IsUserRegisteredApiService} from './is-user-registered-api.service';

describe('IsUserRegisteredApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsUserRegisteredApiService = TestBed.get(IsUserRegisteredApiService);
    expect(service).toBeTruthy();
  });
});
