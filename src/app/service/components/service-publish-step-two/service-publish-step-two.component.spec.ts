import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishStepTwoFormService} from '../../forms/service-publish-step-two-form.service';
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
import {ServicePublishStepTwoComponent} from './service-publish-step-two.component';

describe('ServicePublishStepTwoComponent', () => {
    let component: ServicePublishStepTwoComponent;
    let fixture: ComponentFixture<ServicePublishStepTwoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServicePublishStepTwoComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                ServicePublishDataHolderService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
                ServicePublishStepTwoFormService,
                ServiceStepsNavigationService,
                ChainManagerService,
                StepOneHandlerService,
                StepTwoHandlerService,
                StepThreeHandlerService,
                StepFourHandlerService,
                StepFiveHandlerService,
                StepSixHandlerService,
                StepSevenHandlerService,
                StepFinalHandlerService,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ServicePublishStepTwoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
