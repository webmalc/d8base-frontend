import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistrationService } from '@app/auth/services/registration.service';
import { LocationService } from '@app/core/services/location/location.service';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { LocationServiceMock } from 'src/testing/mocks';
import { ServicePublishStepFourFormService } from '../../forms/service-publish-step-four-form.service';
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
import { ServicePublishStepFourComponent } from './service-publish-step-four.component';

describe('ServicePublishStepFourComponent', () => {
  let component: ServicePublishStepFourComponent;
  let fixture: ComponentFixture<ServicePublishStepFourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePublishStepFourComponent],
      imports: [
        ...ROOT_MODULES,
        ComponentTestingModule,
      ],
      providers: [
        ServicePublishStepFourFormService,
        ServiceStepsNavigationService,
        RegistrationService,
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
        ServicePublishDataHolderService,
        { provide: LocationService, useClass: LocationServiceMock },
        SelectableCountryOnSearchService,
        SelectableCityOnSearchService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
