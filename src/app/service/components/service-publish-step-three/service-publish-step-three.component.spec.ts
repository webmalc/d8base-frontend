import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
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
import { ServicePublishStepThreeComponent } from './service-publish-step-three.component';

describe('ServicePublishStepThreeComponent', () => {
  let component: ServicePublishStepThreeComponent;
  let fixture: ComponentFixture<ServicePublishStepThreeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServicePublishStepThreeComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          ServicePublishDataHolderService,
          ChainManagerService,
          StepOneHandlerService,
          StepTwoHandlerService,
          StepThreeHandlerService,
          StepFourHandlerService,
          StepFiveHandlerService,
          StepSixHandlerService,
          StepSevenHandlerService,
          StepFinalHandlerService,
          ServiceStepsNavigationService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServicePublishStepThreeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
