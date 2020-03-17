import { TestBed } from '@angular/core/testing';

import { MasterManagerService } from './master-manager.service';

describe('MasterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterManagerService = TestBed.get(MasterManagerService);
    expect(service).toBeTruthy();
  });
});
