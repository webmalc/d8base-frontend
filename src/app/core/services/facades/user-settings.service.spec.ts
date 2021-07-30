import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
  let service: UserSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
    });
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
