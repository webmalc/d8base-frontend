import { TestBed } from '@angular/core/testing';

import { SettingsFormService } from './settings-form.service';

describe('SettingsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsFormService = TestBed.get(SettingsFormService);
    expect(service).toBeTruthy();
  });
});
