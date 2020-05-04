import { TestBed } from '@angular/core/testing';

import { EditMasterFormService } from './edit-master-form.service';

describe('EditMasterFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: EditMasterFormService = TestBed.get(EditMasterFormService);
    expect(service).toBeTruthy();
  });
});
