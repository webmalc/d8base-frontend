import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '../proxies/storage-manager.service';
import {DarkModeService} from './dark-mode.service';

describe('DarkModeService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: StorageManagerService, useValue: {}}
        ]
    }));

    it('should be created', () => {
        const service: DarkModeService = TestBed.get(DarkModeService);
        expect(service).toBeTruthy();
    });
});
