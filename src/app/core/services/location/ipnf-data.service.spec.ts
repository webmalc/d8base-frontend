import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IpnfDataService } from './ipnf-data.service';

describe('IpnfDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      IpnfDataService,
    ],
  }));

  it('should be created', () => {
    const service: IpnfDataService = TestBed.inject(IpnfDataService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
