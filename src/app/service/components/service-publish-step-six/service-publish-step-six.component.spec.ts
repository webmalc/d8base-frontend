import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishStepSixFormService} from '../../forms/service-publish-step-six-form.service';
import {ServicePublishAuthStateManagerService} from '../../services/service-publish-auth-state-manager.service';
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
import {ServicePublishStepSixComponent} from './service-publish-step-six.component';

describe('ServicePublishStepSixComponent', () => {
    let component: ServicePublishStepSixComponent;
    let fixture: ComponentFixture<ServicePublishStepSixComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServicePublishStepSixComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot(),
                IonicSelectableModule
            ],
            providers: [
                ServicePublishStepSixFormService,
                ServicePublishDataHolderService,
                ServiceStepsNavigationService,
                ServicePublishAuthStateManagerService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
                ChainManagerService,
                StepOneHandlerService,
                StepTwoHandlerService,
                StepThreeHandlerService,
                StepFourHandlerService,
                StepFiveHandlerService,
                StepSixHandlerService,
                StepSevenHandlerService,
                StepFinalHandlerService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ServicePublishStepSixComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
