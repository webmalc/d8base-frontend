import { TestBed } from '@angular/core/testing';

import { IpServicesHolderService } from './ip-services-holder.service';

describe('IpServicesHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpServicesHolderService = TestBed.get(IpServicesHolderService);
    expect(service).toBeTruthy();
  });
});
