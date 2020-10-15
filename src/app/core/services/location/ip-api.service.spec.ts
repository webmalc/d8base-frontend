import {TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {IpApiService} from './ip-api.service';

describe('IpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: { post: () => {} }},
      IpApiService
    ]
  }));

  it('should be created', () => {
    const service: IpApiService = TestBed.inject(IpApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
