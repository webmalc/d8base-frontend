import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('GlobalErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        RouterTestingModule
    ],
    providers: [
        GlobalErrorHandlerService
    ]
  }));

  it('should be created', () => {
    const service: GlobalErrorHandlerService = TestBed.inject(GlobalErrorHandlerService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
