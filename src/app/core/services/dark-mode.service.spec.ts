import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '../proxies/storage-manager.service';
import {DarkModeService} from './dark-mode.service';

describe('DarkModeService', () => {
    let darkModeService: DarkModeService;
    let storageManagerSpy: jasmine.SpyObj<StorageManagerService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj(
            'StorageManagerService', {get: Promise.resolve(null), set: null}
        );

        TestBed.configureTestingModule({
            providers: [
                DarkModeService,
                {provide: StorageManagerService, useValue: spy}
            ]
        });
        darkModeService = TestBed.inject(DarkModeService);
        storageManagerSpy = TestBed.inject(StorageManagerService) as jasmine.SpyObj<StorageManagerService>;
    });

    it('should be created', () => {
        expect(darkModeService).toBeTruthy();
    });

    it('should return false if there is no data in the storage', () => {
        darkModeService.isDarkMode().then((result) => {
            expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
            expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
            expect(result).toBe(false);
        });
    });

    it('should return false if there is false in the storage', () => {
        storageManagerSpy.get.and.returnValue(Promise.resolve(false));
        darkModeService.isDarkMode().then((result) => {
            expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
            expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
            expect(result).toBe(false);
        });
    });

    it('should return true if there is true in the storage', () => {
        storageManagerSpy.get.and.returnValue(Promise.resolve(true));
        darkModeService.isDarkMode().then((result) => {
            expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
            expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
            expect(result).toBe(true);
        });
    });
});
