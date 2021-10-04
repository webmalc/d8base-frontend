import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { CountrySelectorComponent } from './country-selector.component';

describe('CountrySelectorComponent', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, LocationEditorModule],
      }).compileComponents();

      fixture = TestBed.createComponent(CountrySelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
