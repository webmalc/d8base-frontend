import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { ServicePublishStepSixFormService } from '../../forms/service-publish-step-six-form.service';
import { ServicePublishAuthStateManagerService } from '../../services/service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from '../../services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '../../services/service-steps-navigation.service';
import { ChainManagerService } from '../../services/steps-navigation-chain/chain-manager.service';
import { StepFinalHandlerService } from '../../services/steps-navigation-chain/step-final-handler.service';
import { StepFiveHandlerService } from '../../services/steps-navigation-chain/step-five-handler.service';
import { StepFourHandlerService } from '../../services/steps-navigation-chain/step-four-handler.service';
import { StepOneHandlerService } from '../../services/steps-navigation-chain/step-one-handler.service';
import { StepSevenHandlerService } from '../../services/steps-navigation-chain/step-seven-handler.service';
import { StepSixHandlerService } from '../../services/steps-navigation-chain/step-six-handler.service';
import { StepThreeHandlerService } from '../../services/steps-navigation-chain/step-three-handler.service';
import { StepTwoHandlerService } from '../../services/steps-navigation-chain/step-two-handler.service';
import { ServicePublishStepSixComponent } from './service-publish-step-six.component';

describe('ServicePublishStepSixComponent', () => {
  let component: ServicePublishStepSixComponent;
  let fixture: ComponentFixture<ServicePublishStepSixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePublishStepSixComponent],
      imports: [
        ...ROOT_MODULES,
        ComponentTestingModule,
      ],
      providers: [
        ServicePublishStepSixFormService,
        ServicePublishDataHolderService,
        ServiceStepsNavigationService,
        ServicePublishAuthStateManagerService,
        ChainManagerService,
        StepOneHandlerService,
        StepTwoHandlerService,
        StepThreeHandlerService,
        StepFourHandlerService,
        StepFiveHandlerService,
        StepSixHandlerService,
        StepSevenHandlerService,
        StepFinalHandlerService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishStepSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
