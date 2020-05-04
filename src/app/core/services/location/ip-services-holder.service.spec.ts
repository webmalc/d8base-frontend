import { TestBed } from '@angular/core/testing';

import { IpServicesHolderService } from './ip-services-holder.service';
import {IpApiService} from './ip-api.service';
import {IpDataService} from './ip-data.service';
import {IpnfDataService} from './ipnf-data.service';
import {HttpClient} from '@angular/common/http';

describe('IpServicesHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IpServicesHolderService,
      IpApiService,
      IpDataService,
      IpnfDataService,
      {provide: HttpClient, useValue: { post: () => {} }},
    ]
  }));

  it('should be created', () => {
    const service: IpServicesHolderService = TestBed.get(IpServicesHolderService);
    expect(service).toBeTruthy();
  });
  xit('should be created', () => {
    const service: IpServicesHolderService = TestBed.get(IpServicesHolderService);
    expect(service.list[0] instanceof IpApiService).toBeTruthy();
    expect(service.list[1] instanceof IpDataService).toBeTruthy();
    expect(service.list[2] instanceof IpnfDataService).toBeTruthy();
  });
});
