import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslationService } from '@app/core/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule],
      });

      fixture = TestBed.createComponent(AppComponent);
    }),
  );

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be light mode by default', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('ion-app').getAttribute('class')).not.toContain('dark-theme');
  });

  it('test translation select options', () => {
    const trans: TranslationService = TestBed.inject(TranslationService);
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll('ion-select ion-select-option').forEach((elem: Element) => {
      expect(['ru', 'en']).toContain(elem.innerHTML.trim());
    });
  });
});
