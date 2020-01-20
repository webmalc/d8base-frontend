import { TestBed } from '@angular/core/testing';

import { IpnfDataService } from './ipnf-data.service';
import {HttpClient} from '@angular/common/http';

describe('IpnfDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: { post: () => {} }},
        IpnfDataService
    ]
  }));

  it('should be created', () => {
    const service: IpnfDataService = TestBed.get(IpnfDataService);
    expect(service).toBeTruthy();
  });
});
