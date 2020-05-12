import { TestBed } from '@angular/core/testing';

import { EditMasterFormService } from './edit-master-form.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('EditMasterFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule
    ],
    providers: [
        EditMasterFormService
    ]
  }));

  it('should be created', () => {
    const service: EditMasterFormService = TestBed.inject(EditMasterFormService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
