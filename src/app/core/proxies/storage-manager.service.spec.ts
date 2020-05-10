import { TestBed } from '@angular/core/testing';

import {IonicStorageModule} from '@ionic/storage';
import {StorageManagerService} from './storage-manager.service';

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
    const service: StorageManagerService = TestBed.inject(StorageManagerService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
