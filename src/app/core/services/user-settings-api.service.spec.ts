import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserSettingsApiService } from './user-settings-api.service';

describe('UserSettingsApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserSettingsApiService],
    }),
  );

  it('should be created', () => {
    const service: UserSettingsApiService = TestBed.inject(UserSettingsApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
