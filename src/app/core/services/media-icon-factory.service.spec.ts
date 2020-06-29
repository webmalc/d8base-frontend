import { TestBed } from '@angular/core/testing';

import { MediaIconFactoryService } from './media-icon-factory.service';

describe('MediaIconFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaIconFactoryService = TestBed.get(MediaIconFactoryService);
    expect(service).toBeTruthy();
  });
});
