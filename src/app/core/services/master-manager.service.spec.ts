import { TestBed } from '@angular/core/testing';

import { MasterManagerService } from './master-manager.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MasterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ],
    providers: [
        MasterManagerService
    ]
  }));

  it('should be created', () => {
    const service: MasterManagerService = TestBed.inject(MasterManagerService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
