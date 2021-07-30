import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { LocationStepComponent } from './location-step.component';

describe('LocationStepComponent', () => {
  let component: LocationStepComponent;
  let fixture: ComponentFixture<LocationStepComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LocationStepComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [OrderWizardStateService],
      }).compileComponents();

      fixture = TestBed.createComponent(LocationStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
