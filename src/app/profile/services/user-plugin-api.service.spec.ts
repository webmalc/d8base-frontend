import { TestBed } from '@angular/core/testing';

import { UserPluginApiService } from './user-plugin-api.service';

describe('UserPluginApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPluginApiService = TestBed.get(UserPluginApiService);
    expect(service).toBeTruthy();
  });
});
