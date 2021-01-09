import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrationService} from '@app/auth/services/registration.service';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {LocationService} from '@app/core/services/location/location.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {LocationServiceMock, StorageManagerMock, TokenManagerServiceMock} from 'src/testing/mocks';
import {ServicePublishStepFourFormService} from '../../forms/service-publish-step-four-form.service';
import {ServicePublishDataHolderService} from '../../services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '../../services/service-steps-navigation.service';
import {ChainManagerService} from '../../services/steps-navigation-chain/chain-manager.service';
import {StepFinalHandlerService} from '../../services/steps-navigation-chain/step-final-handler.service';
import {StepFiveHandlerService} from '../../services/steps-navigation-chain/step-five-handler.service';
import {StepFourHandlerService} from '../../services/steps-navigation-chain/step-four-handler.service';
import {StepOneHandlerService} from '../../services/steps-navigation-chain/step-one-handler.service';
import {StepSevenHandlerService} from '../../services/steps-navigation-chain/step-seven-handler.service';
import {StepSixHandlerService} from '../../services/steps-navigation-chain/step-six-handler.service';
import {StepThreeHandlerService} from '../../services/steps-navigation-chain/step-three-handler.service';
import {StepTwoHandlerService} from '../../services/steps-navigation-chain/step-two-handler.service';
import {ServicePublishStepFourComponent} from './service-publish-step-four.component';

describe('ServicePublishStepFourComponent', () => {
    let component: ServicePublishStepFourComponent;
    let fixture: ComponentFixture<ServicePublishStepFourComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ServicePublishStepFourComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot(),
            ],
            providers: [
                ServicePublishStepFourFormService,
                ServiceStepsNavigationService,
                RegistrationService,
                ServicePublishDataHolderService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
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
                IpServicesHolderService,
                IpApiService,
                IpDataService,
                IpnfDataService,
                {provide: LocationService, useClass: LocationServiceMock},
                {provide: TokenManagerService, useValue: TokenManagerServiceMock},
                SelectableCountryOnSearchService,
                SelectableCityOnSearchService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ServicePublishStepFourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
