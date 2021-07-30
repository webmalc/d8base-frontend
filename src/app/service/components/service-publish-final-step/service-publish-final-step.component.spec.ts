import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServicePublishDataHolderService } from '../../services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '../../services/service-publish-data-preparer.service';
import { ServicePublishService } from '../../services/service-publish.service';
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
import { ServicePublishFinalStepComponent } from './service-publish-final-step.component';

describe('ServicePublishFinalStepComponent', () => {
  let component: ServicePublishFinalStepComponent;
  let fixture: ComponentFixture<ServicePublishFinalStepComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServicePublishFinalStepComponent],
        imports: [
          ...RootModules(),
          ComponentTestingModule,
        ],
        providers: [
          ServicePublishService,
          ServiceStepsNavigationService,
          ServicePublishDataPreparerService,
          ChainManagerService,
          StepOneHandlerService,
          StepTwoHandlerService,
          StepThreeHandlerService,
          StepFourHandlerService,
          StepFiveHandlerService,
          StepSixHandlerService,
          StepSevenHandlerService,
          StepFinalHandlerService,
          { provide: ServicePublishDataHolderService, useValue: { getStepData: () => ({ isNewMaster: true }) } },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServicePublishFinalStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
