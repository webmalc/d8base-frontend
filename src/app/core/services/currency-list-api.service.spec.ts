import {TestBed} from '@angular/core/testing';

import {CurrencyListApiService} from './currency-list-api.service';

describe('CurrencyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyListApiService = TestBed.get(CurrencyListApiService);
    expect(service).toBeTruthy();
  });
});
