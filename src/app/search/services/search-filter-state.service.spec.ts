import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterStateService } from './search-filter-state.service';

describe('SearchFilterStateService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SearchFilterStateService, FormBuilder],
    }),
  );

  it('should be created', () => {
    const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
    expect(service).toBeTruthy();
  });
});
