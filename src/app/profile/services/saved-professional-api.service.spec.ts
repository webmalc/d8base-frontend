import { TestBed } from '@angular/core/testing';

import { SavedProfessionalApiService } from './saved-professional-api.service';

describe('SavedProfessionalApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedProfessionalApiService = TestBed.get(SavedProfessionalApiService);
    expect(service).toBeTruthy();
  });
});
