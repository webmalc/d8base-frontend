import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyListApiService } from './currency-list-api.service';

describe('CurrencyListApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            CurrencyListApiService,
        ],
    }));

    it('should be created', () => {
        const service: CurrencyListApiService = TestBed.inject(CurrencyListApiService);
        expect(service).toBeTruthy();
    });
});
