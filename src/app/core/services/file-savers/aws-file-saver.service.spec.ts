import { TestBed } from '@angular/core/testing';

import { AwsFileSaverService } from './aws-file-saver.service';

describe('FileSaverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsFileSaverService = TestBed.get(AwsFileSaverService);
    expect(service).toBeTruthy();
  });
});
