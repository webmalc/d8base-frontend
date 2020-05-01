import { TestBed } from '@angular/core/testing';

import { EditMasterFormService } from './edit-master-form.service';

describe('EditMasterFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditMasterFormService = TestBed.get(EditMasterFormService);
    expect(service).toBeTruthy();
  });
});
