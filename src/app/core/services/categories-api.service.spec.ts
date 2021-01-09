import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {CategoriesApiService} from './categories-api.service';

describe('CategoriesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            CategoriesApiService,
        ],
    }));

    it('should be created', () => {
        const service: CategoriesApiService = TestBed.inject(CategoriesApiService);
        expect(service).toBeTruthy();
    });
});
