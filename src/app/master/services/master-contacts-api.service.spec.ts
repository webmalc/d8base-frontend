import { TestBed } from '@angular/core/testing';

import { MasterContactsApiService } from './master-contacts-api.service';

describe('MasterContactsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterContactsApiService = TestBed.get(MasterContactsApiService);
    expect(service).toBeTruthy();
  });
});
