import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { StorageManagerMock } from '../../../testing/mocks';
import { CalendarGeneratorFactoryService } from './calendar-generator-factory.service';

describe('CalendarGeneratorFactoryService', () => {
  let service: CalendarGeneratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarGeneratorFactoryService, { provide: StorageManagerService, useClass: StorageManagerMock }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalendarGeneratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
