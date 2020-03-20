import { TestBed } from '@angular/core/testing';

import { LanguagesApiService } from './languages-api.service';

describe('LanguagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguagesApiService = TestBed.get(LanguagesApiService);
    expect(service).toBeTruthy();
  });
});
