import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import {IpServicesHolderService} from './ip-services-holder.service';
import {IpApiService} from './ip-api.service';
import {IpDataService} from './ip-data.service';
import {IpnfDataService} from './ipnf-data.service';
import {Observable} from 'rxjs';
import {LocationInterface} from '../../../auth/interfaces/location/location.interface';
import {HttpClient} from '@angular/common/http';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        LocationService,
        IpServicesHolderService,
        IpApiService,
        IpDataService,
        IpnfDataService,
        {provide: HttpClient, useClass: HttpMock}
    ]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
  it('should be created', (done) => {
    const service: LocationService = TestBed.get(LocationService);

    service.getIpData().then(
        (data: LocationInterface) => {
          expect(data.ip).toBe('testIp');
          expect(data.postal_code).toBe('testPostal');
          expect(data.country_code).toBe('testCode');
          done();
        }
    );
  });
});

export class HttpMock {
  public get(url: string): Observable<any> {
    if (url === 'https://ipapi.co/json/') {
      return new Observable<any>(
          subscriber => {
            const data = {
              error: true,
            };
            subscriber.next(data);
            subscriber.complete();
          }
      );
    } else {
      return new Observable<any>(
          subscriber => {
            const data: any = {
              ip: 'testIp',
              postal: 'testPostal',
              country_code: 'testCode'
            };
            subscriber.next(data);
            subscriber.complete();
          }
      );
    }
  }
}
