import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterPhotosApiService } from './master-photos-api.service';

describe('MasterPhotosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      MasterPhotosApiService,
    ],
  }));

  it('should be created', () => {
    const service: MasterPhotosApiService = TestBed.inject(MasterPhotosApiService);
    expect(service).toBeTruthy();
  });
});
