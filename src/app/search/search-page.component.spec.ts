import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '@app/api/services';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Platform } from '@ionic/angular';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StateInterfaceAdapter } from './search-interface-adapter.service';
import { SearchPage } from './search-page.component';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          SearchService,
          { provide: Platform, useValue: { width: () => 1000, is: () => false } },
          SearchFilterStateService,
          FormBuilder,
          StateInterfaceAdapter,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SearchPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
