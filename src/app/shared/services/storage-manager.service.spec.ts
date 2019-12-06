import { TestBed } from '@angular/core/testing';

import { StorageManagerService } from './storage-manager.service';
import {IonicStorageModule} from '@ionic/storage';

describe('StorageManagerService', () => {

  let StorageMock: Partial<Storage>;

  beforeEach(() => {
    StorageMock = {
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null))
    };
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Storage, useValue: StorageMock },
      StorageManagerService
    ],
    imports: [
        IonicStorageModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: StorageManagerService = TestBed.get(StorageManagerService);
    expect(service).toBeTruthy();
  });
});
