import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { AbstractIpService } from './abstract-ip.service';

describe('AbstractIpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
  }));

  it('should be created', () => {
    const service: AbstractIpService = TestBed.get(AbstractIpService);
    expect(service).toBeTruthy();
  });
});
