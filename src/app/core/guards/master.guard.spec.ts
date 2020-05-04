import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master.guard';

describe('MasterGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: MasterGuard = TestBed.get(MasterGuard);
    expect(service).toBeTruthy();
  });
});
