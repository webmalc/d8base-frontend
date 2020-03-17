import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master.guard';

describe('MasterGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterGuard = TestBed.get(MasterGuard);
    expect(service).toBeTruthy();
  });
});
