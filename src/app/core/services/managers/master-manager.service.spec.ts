import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../proxies/storage-manager.service';
import { MasterManagerService } from './master-manager.service';

describe('MasterManagerService', () => {
  let service: MasterManagerService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterManagerService, { provide: StorageManagerService, useClass: StorageManagerMock }],
    });
    service = TestBed.inject(MasterManagerService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
