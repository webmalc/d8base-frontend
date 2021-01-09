import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IpDataService } from './ip-data.service';

describe('IpDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
    ],
    providers: [
      IpDataService,
    ],
  }));

  it('should be created', () => {
    const service: IpDataService = TestBed.inject(IpDataService);
    expect(service).toBeTruthy();
  });

  it('should be some tests');
});
