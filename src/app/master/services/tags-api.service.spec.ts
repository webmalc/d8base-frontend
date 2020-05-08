import { TestBed } from '@angular/core/testing';

import { TagsApiService } from './tags-api.service';

describe('TagsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagsApiService = TestBed.get(TagsApiService);
    expect(service).toBeTruthy();
  });
});
