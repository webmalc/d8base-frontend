import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { CancelConfirmationPopoverComponent } from './cancel-confirmation-popover.component';

describe('CancelConfirmationPopoverComponent', () => {
  let component: CancelConfirmationPopoverComponent;
  let fixture: ComponentFixture<CancelConfirmationPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CancelConfirmationPopoverComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(CancelConfirmationPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
