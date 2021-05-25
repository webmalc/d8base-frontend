import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ProfileService, { provide: StorageManagerService, useClass: StorageManagerMock }],
    }),
  );

  it('should be created', () => {
    const service: ProfileService = TestBed.inject(ProfileService);
    expect(service).toBeTruthy();
  });

  xit('should do some tests');
});
