import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '@app/api/services';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Platform } from '@ionic/angular';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SearchPage } from './search-page.component';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchPage],
        imports: [
          ...RootModules(),
          ComponentTestingModule,
          RouterTestingModule.withRoutes([{ path: 'search', component: AppTestComponent }]),
        ],
        providers: [
          SearchService,
          { provide: Platform, useValue: { width: () => 1000, is: () => true } },
          SearchFilterStateService,
          FormBuilder,
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

@Component({
  selector: 'app-test',
  template: '',
})
class AppTestComponent {}
