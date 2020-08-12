import {TestBed} from '@angular/core/testing';

import {CurrencyListService} from './currency-list.service';

describe('CurrencyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyListService = TestBed.get(CurrencyListService);
    expect(service).toBeTruthy();
  });
});
