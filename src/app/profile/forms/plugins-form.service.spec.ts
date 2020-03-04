import { TestBed } from '@angular/core/testing';

import { PluginsFormService } from './plugins-form.service';

describe('PluginsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PluginsFormService = TestBed.get(PluginsFormService);
    expect(service).toBeTruthy();
  });
});
