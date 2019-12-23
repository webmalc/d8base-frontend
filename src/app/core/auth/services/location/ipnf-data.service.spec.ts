import { TestBed } from '@angular/core/testing';

import { IpnfDataService } from './ipnf-data.service';

describe('IpnfDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpnfDataService = TestBed.get(IpnfDataService);
    expect(service).toBeTruthy();
  });
});
