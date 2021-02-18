import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { SelectablePostalCodeOnSearchService } from '@app/shared/services/selectable-postal-code-on-search.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServicePublishStepSevenFormService } from '../../forms/service-publish-step-seven-form.service';
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
import { ServicePublishStepSevenComponent } from './service-publish-step-seven.component';

describe('ServicePublishStepSevenComponent', () => {
  let component: ServicePublishStepSevenComponent;
  let fixture: ComponentFixture<ServicePublishStepSevenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePublishStepSevenComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
      providers: [
        ServicePublishStepSevenFormService,
        ServicePublishDataHolderService,
        SelectableCountryOnSearchService,
        SelectableCityOnSearchService,
        SelectablePostalCodeOnSearchService,
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

    fixture = TestBed.createComponent(ServicePublishStepSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
