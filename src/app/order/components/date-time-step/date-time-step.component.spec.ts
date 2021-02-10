import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';

import { DateTimeStepComponent } from './date-time-step.component';

describe('DateTimeStepComponent', () => {
  let component: DateTimeStepComponent;
  let fixture: ComponentFixture<DateTimeStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeStepComponent],
      imports: [
        IonicModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        OrderWizardStateService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
