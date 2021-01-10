import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LatestMessagesApiService } from './latest-messages-api.service';

describe('LatestMessagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      LatestMessagesApiService,
    ],
  }));

  it('should be created', () => {
    const service: LatestMessagesApiService = TestBed.inject(LatestMessagesApiService);
    expect(service).toBeTruthy();
  });
});
