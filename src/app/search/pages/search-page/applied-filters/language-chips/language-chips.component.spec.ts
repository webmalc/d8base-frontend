import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { LanguageChipsComponent } from './language-chips.component';

describe('LanguagesChipsComponent', () => {
  let component: LanguageChipsComponent;
  let fixture: ComponentFixture<LanguageChipsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LanguageChipsComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LanguageChipsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
