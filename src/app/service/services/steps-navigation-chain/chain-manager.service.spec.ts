import {TestBed} from '@angular/core/testing';

import {ChainManagerService} from './chain-manager.service';

describe('ChainManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChainManagerService = TestBed.get(ChainManagerService);
    expect(service).toBeTruthy();
  });
});
