import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SummaryStepComponent } from './summary-step.component';

describe('SummaryStepComponent', () => {
  let component: SummaryStepComponent;
  let fixture: ComponentFixture<SummaryStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryStepComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
      providers: [OrderWizardStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
