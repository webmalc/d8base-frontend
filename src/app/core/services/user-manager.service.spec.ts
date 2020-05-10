import { TestBed } from '@angular/core/testing';

import { UserManagerService } from './user-manager.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ],
    providers: [UserManagerService]
  }));

  it('should be created', () => {
    const service: UserManagerService = TestBed.inject(UserManagerService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
