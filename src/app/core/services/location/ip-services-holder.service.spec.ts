import { TestBed } from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IpApiService} from './ip-api.service';
import {IpDataService} from './ip-data.service';
import { IpServicesHolderService } from './ip-services-holder.service';
import {IpnfDataService} from './ipnf-data.service';

describe('IpServicesHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ],
    providers: [
      IpServicesHolderService,
      IpApiService,
      IpDataService,
      IpnfDataService,
    ]
  }));

  it('should be created', () => {
    const service: IpServicesHolderService = TestBed.inject(IpServicesHolderService);
    expect(service).toBeTruthy();
  });

  it('should be created related services', () => {
    const service: IpServicesHolderService = TestBed.inject(IpServicesHolderService);
    expect(service.list.length).toEqual(3);
    expect(service.list[0]).toBeTruthy();
    expect(service.list[1]).toBeTruthy();
    expect(service.list[2]).toBeTruthy();
  });

  xit('should be some tests');
});
