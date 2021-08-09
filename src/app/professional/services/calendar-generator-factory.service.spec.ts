import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { CalendarGeneratorFactoryService } from './calendar-generator-factory.service';

describe('CalendarGeneratorFactoryService', () => {
  let service: CalendarGeneratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarGeneratorFactoryService, { provide: StorageManagerService, useClass: StorageManagerMock }],
      imports: [...RootModules(), ComponentTestingModule],
    });
    service = TestBed.inject(CalendarGeneratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
