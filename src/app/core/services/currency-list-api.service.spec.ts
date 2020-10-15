import {TestBed} from '@angular/core/testing';

import {CurrencyListApiService} from './currency-list-api.service';

describe('CurrencyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyListApiService = TestBed.inject(CurrencyListApiService);
    expect(service).toBeTruthy();
  });
});
