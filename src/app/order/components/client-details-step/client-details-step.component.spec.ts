import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderPageModule } from '@app/order/order.module';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ClientDetailsStepComponent } from './client-details-step.component';

describe('ClientDetailsStepComponent', () => {
  let component: ClientDetailsStepComponent;
  let fixture: ComponentFixture<ClientDetailsStepComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, OrderPageModule],
        providers: [OrderWizardStateService],
      }).compileComponents();

      fixture = TestBed.createComponent(ClientDetailsStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
