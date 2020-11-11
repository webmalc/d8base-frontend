import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from '../../../../testing/mocks';
import {DefaultLocationCompilerService} from './default-location-compiler.service';

describe('DefaultLocationCompilerService', () => {
    let service: DefaultLocationCompilerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                IpServicesHolderService,
                IpApiService,
                IpDataService,
                IpnfDataService,
                {provide: Geolocation, useValue: {getCurrentPosition: () => 'test'}},
                {provide: LocationAccuracy, useValue: {canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test'}},
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ],
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot()
            ]
        });
        service = TestBed.inject(DefaultLocationCompilerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
