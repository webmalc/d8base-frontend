import { TestBed } from '@angular/core/testing';

import { IpnfDataService } from './ipnf-data.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('IpnfDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ],
    providers: [
        IpnfDataService
    ]
  }));

  it('should be created', () => {
    const service: IpnfDataService = TestBed.get(IpnfDataService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
