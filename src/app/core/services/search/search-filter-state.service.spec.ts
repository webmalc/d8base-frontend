import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SearchFilterStateService } from './search-filter-state.service';

describe('SearchFilterStateService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
    }),
      (httpMock = TestBed.inject(HttpTestingController));
  });

  it('should be created', () => {
    const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
    expect(service).toBeTruthy();
  });
});
