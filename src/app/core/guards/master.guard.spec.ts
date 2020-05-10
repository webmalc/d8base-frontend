import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MasterGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ],
    providers: [
        MasterGuard
    ]
  }));

  it('should be created', () => {
    const service: MasterGuard = TestBed.inject(MasterGuard);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
