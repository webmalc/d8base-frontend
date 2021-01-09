import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IpApiService } from './ip-api.service';
import { IpDataService } from './ip-data.service';
import { IpServicesHolderService } from './ip-services-holder.service';
import { IpnfDataService } from './ipnf-data.service';

describe('IpServicesHolderService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            IpServicesHolderService,
            IpApiService,
            IpDataService,
            IpnfDataService,
        ],
    }));

    it('should be created', () => {
        const service: IpServicesHolderService = TestBed.inject(IpServicesHolderService);
        expect(service).toBeTruthy();
    });

    it('should be created related services', () => {
        const service: IpServicesHolderService = TestBed.inject(IpServicesHolderService);
        expect(service.getList().length).toEqual(3);
        expect(service.getList()[0]).toBeTruthy();
        expect(service.getList()[1]).toBeTruthy();
        expect(service.getList()[2]).toBeTruthy();
    });

    xit('should be some tests');
});
