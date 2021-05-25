import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalErrorHandler } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        GlobalErrorHandler,
        { provide: AuthenticationService, useValue: { isAuthenticated: () => of(true) } },
      ],
    }),
  );

  it('should be created', () => {
    const service: GlobalErrorHandler = TestBed.inject(GlobalErrorHandler);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
