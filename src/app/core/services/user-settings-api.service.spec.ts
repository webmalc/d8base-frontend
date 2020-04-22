import { TestBed } from '@angular/core/testing';

import { UserSettingsApiService } from './user-settings-api.service';

describe('UserSettingsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSettingsApiService = TestBed.get(UserSettingsApiService);
    expect(service).toBeTruthy();
  });
});
