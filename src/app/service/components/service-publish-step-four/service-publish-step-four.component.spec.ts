import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import {TranslateModule} from '@ngx-translate/core';
import {RegistrationService} from '../../../auth/services/registration.service';
import {IpLocation} from '../../../core/models/ip-location';
import {UserLocation} from '../../../core/models/user-location';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {IpApiService} from '../../../core/services/location/ip-api.service';
import {IpDataService} from '../../../core/services/location/ip-data.service';
import {IpServicesHolderService} from '../../../core/services/location/ip-services-holder.service';
import {IpnfDataService} from '../../../core/services/location/ipnf-data.service';
import {LocationService} from '../../../core/services/location/location.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
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

export class LocationServiceMock {
    public getCurrentPosition(): Promise<Geoposition | null> {
        return Promise.resolve(null);
    }

    public getMergedLocationData(): Promise<UserLocation | null> {
        return Promise.resolve(null);
    }

    public async getIpLocationData(): Promise<IpLocation | null> {
        return Promise.resolve(null);
    }
}

describe('ServicePublishStepFourComponent', () => {
    let component: ServicePublishStepFourComponent;
    let fixture: ComponentFixture<ServicePublishStepFourComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServicePublishStepFourComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot()
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
                {provide: LocationService, useClass: LocationServiceMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ServicePublishStepFourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
