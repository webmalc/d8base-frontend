import { TestBed } from '@angular/core/testing';

import { IpDataService } from './ip-data.service';
import {HttpClient} from '@angular/common/http';

describe('IpDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: { post: () => {} }},
      IpDataService
    ]
  }));

  it('should be created', () => {
    const service: IpDataService = TestBed.get(IpDataService);
    expect(service).toBeTruthy();
  });
});
