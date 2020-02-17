import {TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationInterface} from '../../../auth/interfaces/location/location.interface';
import {IpApiService} from './ip-api.service';
import {IpDataService} from './ip-data.service';
import {IpServicesHolderService} from './ip-services-holder.service';
import {IpnfDataService} from './ipnf-data.service';
import {LocationService} from './location.service';

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

        service.getIpLocationData().then(
            (data: LocationInterface) => {
                expect(data.postalCode).toBe('testPostal');
                expect(data.countryCode).toBe('testCode');
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
        }

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
