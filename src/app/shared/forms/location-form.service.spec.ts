import { TestBed } from '@angular/core/testing';

import { LocationFormService } from './location-form.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('LocationFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule],
    providers: [LocationFormService]
  }));

  it('should be created', () => {
    const service: LocationFormService = TestBed.inject(LocationFormService);
    expect(service).toBeTruthy();
  });
});
