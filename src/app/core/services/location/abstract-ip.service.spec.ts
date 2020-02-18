import { TestBed } from '@angular/core/testing';

import { AbstractIpService } from './abstract-ip.service';

describe('AbstractIpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractIpService = TestBed.get(AbstractIpService);
    expect(service).toBeTruthy();
  });
});
