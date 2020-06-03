import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../proxies/storage-manager.service';
import { TimezoneService } from './timezone.service';

describe('TimezoneService', () => {
    let storageManagerSpy: jasmine.SpyObj<StorageManagerService>;
    beforeEach(() => {
        const spy = jasmine.createSpyObj(
            'StorageManagerService', {get: Promise.resolve(null), set: null}
        );
        TestBed.configureTestingModule({
            providers: [
                TimezoneService,
                {provide: StorageManagerService, useValue: spy}
            ],
            imports: [
                HttpClientTestingModule
            ]

        });
        storageManagerSpy = TestBed.get(StorageManagerService);
    });

    it('should be created', () => {
        const service: TimezoneService = TestBed.get(TimezoneService);
        expect(service).toBeTruthy();
    });
});
