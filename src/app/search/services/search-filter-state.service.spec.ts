import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterStateService } from './search-filter-state.service';

describe('SearchFilterStateService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SearchFilterStateService, FormBuilder],
    }),
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
    expect(service).toBeTruthy();
  });
});
