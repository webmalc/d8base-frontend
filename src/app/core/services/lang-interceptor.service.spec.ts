import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../testing/mocks';
import {LangInterceptorService} from './lang-interceptor.service';

describe('LangInterceptorService', () => {
    let service: LangInterceptorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LangInterceptorService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
            imports: [
                HttpClientTestingModule,
            ],
        });
        service = TestBed.inject(LangInterceptorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
