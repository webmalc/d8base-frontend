import { TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SearchFilterStateService } from './search-filter-state.service';

describe('SearchFilterStateService', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();
    }),
  );

  it('should be created', () => {
    const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
    expect(service).toBeTruthy();
  });
});
