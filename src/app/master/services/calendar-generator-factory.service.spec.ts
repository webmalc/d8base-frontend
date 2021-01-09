import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {CalendarApiService} from '@app/master/services/calendar-api.service';
import {StorageManagerMock} from '../../../testing/mocks';
import {CalendarGeneratorFactoryService} from './calendar-generator-factory.service';

describe('CalendarGeneratorFactoryService', () => {
    let service: CalendarGeneratorFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CalendarGeneratorFactoryService,
                CalendarApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(CalendarGeneratorFactoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
