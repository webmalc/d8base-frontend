import {TestBed} from '@angular/core/testing';

import {UserLanguagesApiService} from './user-languages-api.service';

describe('UserLanguagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLanguagesApiService = TestBed.inject(UserLanguagesApiService);
    expect(service).toBeTruthy();
  });
});
