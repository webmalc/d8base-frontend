import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleEditorFormService } from './schedule-editor-form.service';

describe('ScheduleEditorFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule, FormsModule,
    ],
    providers: [
      ScheduleEditorFormService,
    ],
  }));

  it('should be created', () => {
    const service: ScheduleEditorFormService = TestBed.inject(ScheduleEditorFormService);
    expect(service).toBeTruthy();
  });
});
