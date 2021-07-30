import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { StorageManagerMock } from 'src/testing/mocks';
import { ReviewsModule } from '../reviews.module';

import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReviewsModule, HttpClientTestingModule],
      providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
    });
    service = TestBed.inject(ReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
