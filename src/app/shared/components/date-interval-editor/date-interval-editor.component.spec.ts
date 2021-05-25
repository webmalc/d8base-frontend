import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { DateIntervalEditorComponent } from './date-interval-editor.component';

describe('DateIntervalEditorComponent', () => {
  let component: DateIntervalEditorComponent;
  let fixture: ComponentFixture<DateIntervalEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DateIntervalEditorComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(DateIntervalEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
