import { TestBed } from '@angular/core/testing';

import { IpApiService } from './ip-api.service';
import {HttpClient} from '@angular/common/http';

describe('IpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: { post: () => {} }},
      IpApiService
    ]
  }));

  it('should be created', () => {
    const service: IpApiService = TestBed.get(IpApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
