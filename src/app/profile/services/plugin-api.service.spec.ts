import { TestBed } from '@angular/core/testing';

import { PluginApiService } from './plugin-api.service';

describe('PluginApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PluginApiService = TestBed.get(PluginApiService);
    expect(service).toBeTruthy();
  });
});