import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {DefaultCategoriesFactoryService} from './default-categories-factory.service';

describe('DefaultCategoriesFactoryService', () => {
    let service: DefaultCategoriesFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                DefaultCategoriesFactoryService,
            ],
        });
        service = TestBed.inject(DefaultCategoriesFactoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
