import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderPageModule } from '@app/order/order.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ConfirmationStepComponent } from './confirmation-step.component';

describe('ConfirmationStepComponent', () => {
  let component: ConfirmationStepComponent;
  let fixture: ComponentFixture<ConfirmationStepComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, OrderPageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfirmationStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
