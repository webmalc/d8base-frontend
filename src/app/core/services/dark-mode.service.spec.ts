import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { StorageManagerService } from '../proxies/storage-manager.service';
import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let storageManagerSpy: jasmine.SpyObj<StorageManagerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(
      'StorageManagerService', { get: Promise.resolve(null), set: null },
    );

    TestBed.configureTestingModule({
      providers: [
        DarkModeService,
        { provide: StorageManagerService, useValue: spy },
      ],
    });
    storageManagerSpy = TestBed.inject(StorageManagerService) as jasmine.SpyObj<StorageManagerService>;
  });

  it('should be created', () => {
    const darkModeService = TestBed.inject(DarkModeService);
    expect(darkModeService).toBeTruthy();
  });

  it('should return false if there is no data in the storage', (done) => {
    const darkModeService = TestBed.inject(DarkModeService);
    darkModeService.darkTheme$.pipe(first()).subscribe((result) => {
      expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
      expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
      expect(result).toBe(false);
      done();
    });
  });

  it('should return false if there is false in the storage', (done) => {
    storageManagerSpy.get.and.returnValue(Promise.resolve(false));
    const darkModeService = TestBed.inject(DarkModeService);
    darkModeService.darkTheme$.pipe(first()).subscribe((result) => {
      expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
      expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
      expect(result).toBe(false);
      done();
    });
  });

  it('should return true if there is true in the storage', (done) => {
    storageManagerSpy.get.and.returnValue(Promise.resolve(true));
    const darkModeService = TestBed.inject(DarkModeService);
    darkModeService.darkTheme$.pipe(first()).subscribe((result) => {
      expect(storageManagerSpy.get).toHaveBeenCalledTimes(1);
      expect(storageManagerSpy.get).toHaveBeenCalledWith('is_dark_mode');
      expect(result).toBe(true);
      done();
    });
  });
});
