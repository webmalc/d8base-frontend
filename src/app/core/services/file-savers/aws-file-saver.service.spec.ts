import { TestBed } from '@angular/core/testing';

import { AwsFileSaverService } from './aws-file-saver.service';
import {FileSaverService} from './file-saver-abstract.service';
import {fileSaverProvider} from './file-saver-service.provider';

describe('FileSaverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [fileSaverProvider]
  }));

  it('should be created', () => {
    const service: FileSaverService = TestBed.get(FileSaverService);
    expect(service).toBeTruthy();
  });
});
