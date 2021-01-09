import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TagsListApiService} from './tags-list-api.service';

describe('TagsListApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [TagsListApiService],
  }));

  it('should be created', () => {
    const service: TagsListApiService = TestBed.inject(TagsListApiService);
    expect(service).toBeTruthy();
  });
});
